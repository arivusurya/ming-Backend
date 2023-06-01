const express = require("express");
const Model = require("../model");
const { where } = require("sequelize");
const jwthandler = require("../middleware/TokenHandler");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Model.user.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user Found", redirecturl: "/register" });
    } else {
      if (user.dataValues.password === password) {
        const token = jwthandler.Singtoken({
          userid: user.dataValues.userid,
          email: user.dataValues.email,
        });
        return res
          .setHeader("Authorization", "Barer " + token)
          .json({ message: "Home Url" });
      } else {
        return res.status(402).json({ message: "not auth" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Model.user.findOne({ where: { email: email } });
    if (!user) {
      user = await Model.user.create({ email: email, password: password });
      res
        .status(201)
        .json({ message: "user created successfully", data: user });
    } else {
      res.status(403).json({ message: "user exits", redirecturl: "/login" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error" });
  }
});

module.exports = router;
