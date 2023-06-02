const express = require("express");
const { Verifytoken } = require("../middleware/TokenHandler");
const Model = require("../model");

const router = express.Router();

router.post("/addreview", Verifytoken, async (req, res) => {
  const { productid, rating, comment } = req.body;
  try {
    const review = await Model.review.create({
      userid: req.userid,
      productId: productid,
      rating: rating,
      comment: comment,
    });
    res.status(301).json({ message: "review created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
