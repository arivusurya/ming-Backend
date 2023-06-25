const express = require("express");
const router = express.Router();

const { errorHandler } = require("../v1/middleware/error.middleware");

const userRoute = require("./routes/User.routes");
const panelRoute = require("../v1/routes/panel.routes");
const webRoute = require("../v1/routes/web.routes");

router.use("/user", userRoute);
router.use("/panel", panelRoute);
router.use("/web", webRoute);

router.use((err, req, res, next) => errorHandler(err, req, res));

router.use("*", (req, res) => {
  res.json({
    message: "ROUTE_NOT_FOUND!",
  });
});

module.exports = router;
