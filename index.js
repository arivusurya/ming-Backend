require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const Cart = require("./version/v1/models/cart.model");
const Address = require("./version/v1/models/address.model");
const User = require("./version/v1/models/user.model");
const Order = require("./version/v1/models/order.model");
const OrderItem = require("./version/v1/models/orderItem.model");
const ShipToken = require("./version/v1/models/shiprocket.model");
const {
  IntiateToken,
  TokenCollector,
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
IntiateToken();
// cron.schedule("0 0 * * 1", TokenCollector);

app.use("/api/v1", require("./version/v1/router"));

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return res.json({
    message: "working!",
    ip: ip,
  });
});

app.use("*", (req, res) => {
  return res.json({
    message: "NOT_FOUND!",
  });
});

process.on("uncaughtException", function (err) {
  console.log(new Date().toUTCString() + " uncaughtException:", err.message);
  // process.exit(1);
});

const PORT = process.env.PORT ?? 5000;

if (process.env.SERVERLESS !== true) {
  // const crons = require("./cron");
  // crons.initiateCrons();
  app.listen(PORT, async () => {
    // await OrderItem.sync({ force: true });
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
