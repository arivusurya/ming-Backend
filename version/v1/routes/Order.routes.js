const express = require("express");
const Model = require("../model");
const jwthandler = require("../middleware/TokenHandler");
const Ordercontroller = require("../controller/Order.controller");

const router = express.Router();

router.post("/create/:userid", Ordercontroller.createOrder);

router.get("/getorder/:userid", Ordercontroller.getOrder);

router.get("/:userid", Ordercontroller.getOrdersByuserid);

module.exports = router;