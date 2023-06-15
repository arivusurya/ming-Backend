const express = require("express");
const jwt = require("jsonwebtoken");
const Usercontroller = require("../controller/User.controller");
const { route } = require("./Payment.routes");
const Model = require("../model");

const router = express.Router();

router.post("/login", Usercontroller.login);

router.post("/register", Usercontroller.Register);

router.get("/confirmation/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const decode = jwt.verify(token, process.env.jwtsecert);
    const User = Model.user.update(
      { verified: true },
      { where: { email: decode.email } }
    );
    res.redirect("http://localhost:5000/api/login");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
