const express = require("express");
const Model = require("../model");
const jwthandler = require("../middleware/TokenHandler");
const Productcontroller = require("../controller/Product.controller");

const router = express.Router();

router.get(
  "/products",
  jwthandler.Verifytoken,
  Productcontroller.getAllproduct
);

router.post(
  "/product",

  Productcontroller.createProduct
);

router.get("/product/:id", Productcontroller.getProductbyId);

router.get("/products/category", Productcontroller.getbyCategory);

module.exports = router;
