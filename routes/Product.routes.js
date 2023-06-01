const express = require("express");
const Model = require("../model");
const jwthandler = require("../middleware/TokenHandler");

const router = express.Router();

router.get("/products", jwthandler.Verifytoken, async (req, res) => {
  try {
    const Products = await Model.product.findAll();
    res.status(200).json({ product: Products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error" });
  }
});

module.exports = router;
