const express = require("express");
const Model = require("../model");
const jwthandler = require("../middleware/TokenHandler");
const Productcontroller = require("../controller/Product.controller");

const router = express.Router();

router.get("/products", jwthandler.Verifytoken, async (req, res) => {
  try {
    const Products = await Model.product.findAll({ include: Model.category });
    res.status(200).json({ product: Products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error" });
  }
});

router.post("/product", Productcontroller.createProduct);

router.get("/product/:id", Productcontroller.getProductbyId);

router.get("/products/category", Productcontroller.getbyCategory);

module.exports = router;
