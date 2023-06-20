const Model = require("../model");
const bcrypt = require("bcrypt");
const { where, json } = require("sequelize");
const jwt = require("jsonwebtoken");
const jwthandler = require("../middleware/TokenHandler");
const UserVerifyEmail = require("../helper/UserVerification");
const VerifiedToken = require("../helper/VerifiedToken");
const { logger } = require("../logger/logger");
const User = require("../model/User.model");
const { use } = require("../routes/Payment.routes");
const Usercontroller = {};

Usercontroller.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      let isvalid = await bcrypt.compare(password, user.dataValues.password);
      if (isvalid) {
        const token = jwt.sign(
          { email: user.email, id: user.userid },
          process.env.jwtsecert
        );
        res.set({ Authorization: `Barer ${token}` });
        return res.status(200).json({
          message: "Success",
          User: {
            userid: user.userid,
            firstname: user.firstname,
            email: user.email,
          },
        });
      }
      return res.status(403).json({ message: "Invalid Credintials" });
    }
    res.status(404).json({ message: "User Not Found Please Register" });
  } catch (error) {
    console.log(error);
  }
};

Usercontroller.Register = async (req, res) => {
  const { firstname, email, password, phoneNum } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(301).json({ message: "User Already Exits" });
    } else {
      user = await User.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
        firstname: firstname,
        phoneNum: phoneNum,
      });
      res.status(200).json({ message: "User Created Sucessfully" });
    }
  } catch (error) {
    logger.error(error);
    console.log(error);
    res.status(500).json({ message: "Internel server error" });
  }
};

module.exports = Usercontroller;
