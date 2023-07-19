const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RazorpayId,
  key_secret: process.env.RazorpaySceret,
});

module.exports = razorpay;
