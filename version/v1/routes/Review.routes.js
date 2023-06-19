const express = require("express");
const { Verifytoken } = require("../middleware/TokenHandler");
const Model = require("../model");
const Product = require("../model/Product.model");

const router = express.Router();

router.post("/addreview", Verifytoken, async (req, res) => {
  const { productid, comment } = req.body;
  try {
    const product = await Product.findOne({ where: { productId: productid } });
    if (product) {
      const review = await Model.review.create({
        productId: productid,
        comment: comment,
      });
      return res.status(301).json({ message: "review created" });
    }
    throw new Error("Product Not Found on this id");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
