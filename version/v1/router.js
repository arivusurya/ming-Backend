const express = require("express");
const router = express.Router();

const { errorHandler } = require("../v1/middleware/error.middleware");
const userRoute = require("./routes/user.routes");

router.use("/user", userRoute);

router.use((err, req, res, next) => errorHandler(err, req, res));

router.use("*", (req, res) => {
  res.json({
    message: "ROUTE_NOT_FOUND!",
  });
});

module.exports = router;
