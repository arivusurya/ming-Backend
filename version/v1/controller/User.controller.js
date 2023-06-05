const Model = require("../model");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const jwthandler = require("../middleware/TokenHandler");
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
      res.status(201).json({ message: "user created successfully" });
    } else {
      res.status(403).json({ message: "user exits", redirecturl: "/login" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error" });
  }
};

module.exports = Usercontroller;
