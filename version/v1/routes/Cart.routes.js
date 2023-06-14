const express = require("express");
const Model = require("../model");
const jwthandler = require("../middleware/TokenHandler");
const Cartcontroller = require("../controller/Cart.controller");

const router = express.Router();

router.post("/add-to-cart", jwthandler.Verifytoken, Cartcontroller.addToCart);

router.post("/remove/:userid", Cartcontroller.removeFromCart);

router.get("/getcart/:userid", Cartcontroller.getSingleCart);

router.get("/:userid", Cartcontroller.getAllCartbyuserid);

module.exports = router;
