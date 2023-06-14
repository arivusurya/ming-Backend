const express = require("express");
const Jwthandler = require("../middleware/TokenHandler");
const Razorpay = require("razorpay");
const { v4: uuid } = require("uuid");
const Product = require("../model/Product.model");

const Model = require("../model");
const Order = require("../model/Order.model");
require("dotenv").config();

const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.razorpayid,
  key_secret: process.env.razorpaysecret,
});

router.post("/payment", Jwthandler.Verifytoken, async (req, res) => {
  const userid = req.User.userid;
  const cartRow = await Model.cart.findOne({
    where: { userid: userid },
    include: { model: Product },
  });
  const TotalAmount = cartRow.quantity * cartRow.Product.price;
  const receipt = uuid();
  const order = await razorpay.orders.create({
    amount: TotalAmount,
    currency: "INR",
    receipt: receipt,
  });
  const orderRow = await Order.findOrCreate({
    where: { orderId: order.id },
    defaults: {
      userid: userid,
      productId: cartRow.Product.productId,
      amount: TotalAmount,
      reciptID: receipt,
    },
  });
  res.status(402).json({
    message: "Required Payment",
    orderid: order.id,
    amount: order.amount,
    currency: order.currency,
  });
});

router.post("/verify-payment", async (req, res) => {});

module.exports = router;
