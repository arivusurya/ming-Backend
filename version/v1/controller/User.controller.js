const Model = require("../model");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const jwt = require("jsonwebtoken");
const jwthandler = require("../middleware/TokenHandler");
const UserVerifyEmail = require("../helper/UserVerification");
const VerifiedToken = require("../helper/VerifiedToken");
const logger = require("../logger/logger");
const Usercontroller = {};

Usercontroller.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Model.user.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user Found", redirecturl: "/register" });
    }

    if (user && user.dataValues.verified === false) {
      let url = VerifiedToken({ email: email });
      UserVerifyEmail(email, url);
      return res
        .status(200)
        .json({ message: "please Confirm the link send throug the email" });
    }

    let isvalid = await bcrypt.compare(password, user.dataValues.password);
    if (isvalid) {
      const token = jwthandler.Singtoken({
        userid: user.dataValues.userid,
        email: user.dataValues.email,
        verified: user.dataValues.verified,
      });
      return res
        .setHeader("Authorization", "Barer " + token)
        .json({ message: "Home Url" });
    } else {
      return res.status(402).json({ message: "not auth" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

Usercontroller.Register = async (req, res) => {
  const { firstname, email, password, phoneNum } = req.body;
  console.log(req.body);
  try {
    let user = await Model.user.findOne({ where: { email: email } });
    if (!user) {
      const hashedpassword = await bcrypt.hash(password, 10);
      user = await Model.user.create({
        firstname: firstname,
        email: email,
        password: hashedpassword,
        phoneNum: phoneNum,
      });

      let url = VerifiedToken({ email: email });
      UserVerifyEmail(firstname, email, url);
      return res.json({
        message: "We Send the Confirmation Link  on Your Email to Verify ",
      });
    }

    if (user && user.dataValues.verified === false) {
      let url = VerifiedToken({ email: email });
      UserVerifyEmail(email, url);
      return res
        .status(200)
        .json({ message: "please Confirm the link send throug the email" });
    }

    res.status(301).json({ message: "User found" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internel server error" });
  }
};

module.exports = Usercontroller;
