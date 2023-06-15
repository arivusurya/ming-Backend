const Model = require("../model");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const jwt = require("jsonwebtoken");
const jwthandler = require("../middleware/TokenHandler");
const UserVerifyEmail = require("../helper/UserVerification");
const Usercontroller = {};

Usercontroller.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Model.user.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user Found", redirecturl: "/register" });
    } else {
      let isvalid = await bcrypt.compare(password, user.dataValues.password);
      if (isvalid) {
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
};

Usercontroller.Register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Model.user.findOne({ where: { email: email } });
    if (!user) {
      const hashedpassword = await bcrypt.hash(password, 10);
      user = await Model.user.create({
        email: email,
        password: hashedpassword,
      });
      let expiresIn = "1d";
      const token = jwt.sign({ email: email }, process.env.jwtsecert, {
        expiresIn,
      });
      let url = `http:localhost:5000/api/confirmation/${token}`;
      UserVerifyEmail(email, url);
      res.json({
        message: "We Send the Confirmation Link  on Your Email to Verify ",
      });
    } else {
      res.status(403).json({ message: "user exits", redirecturl: "/login" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error" });
  }
};

module.exports = Usercontroller;
