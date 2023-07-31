require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const Order = require("./version/v1/models/order.model");
const constantutils = require("./version/v1/utils/constant.utils");


const {
  IntiateToken,
  TokenCollector,
  ClearPaymentId,
} = require("./version/v1/Scheduler/ScheduleTask");
const cron = require("node-cron");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  onLimitReached: (req, res, options) => {
    res.status(429).send("Too many requests, please try again later.");
  },
});

const app = express();

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors("*"));
app.use(morgan("dev"));
// IntiateToken();
cron.schedule("0 0 * * *", TokenCollector);
cron.schedule("0 0 * * *", ClearPaymentId);

app.use("/api/v1", require("./version/v1/router"));

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return res.json({
    message: "working!",
    ip: ip,
  });
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const order = await Order.findOne({
      where: { orderId: req?.body?.order_id },
    });

    if (!order) {
      return res.status(404).json({ message: "order Not Found" });
    }
    order.awbcode = req?.body?.awb;
    order.shippingMethod = req?.body?.courier_name;
    if (req?.body?.shipment_status === "PICKED UP") {
      order.status = constantutils.PROCESSING;
    }
    if (req?.body?.shipment_status === "Delivered") {
      order.status = constantutils.DELIVERED;
    }
    if (req?.body?.shipment_status === "Canceled") {
      order.status = constantutils.CANCELED;
    }

    order.etd = req?.body?.etd;
    await order.save();
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(200).json({ message: "okk" });
  }

  res.status(200).json({ message: "okk" });
});

app.use("*", (req, res) => {
  return res.json({
    message: "PAGE_NOT_FOUND!",
  });
});

process.on("uncaughtException", function (err) {
  console.log(new Date().toUTCString() + " uncaughtException:", err.message);
  // process.exit(1);
});

const PORT = process.env.PORT ?? 5000;

if (process.env.SERVERLESS !== true) {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
