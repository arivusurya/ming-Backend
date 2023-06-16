const jwt = require("jsonwebtoken");
const VerifiedToken = require("../helper/VerifiedToken");
require("dotenv").config();

const jwthandler = {};

const Singtoken = (payload) => {
  const token = jwt.sign(payload, process.env.jwtsecert);
  return token;
};

const Verifytoken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Un Authorized" });
  }

  jwt.verify(token.split(" ")[1], process.env.jwtsecert, (err, decoded) => {
    if (err) {
      return res.status(402).json({ message: "Invalid token" });
    }
    if (decoded.verified === false) {
      let url = VerifiedToken({ email: email });
      UserVerifyEmail(email, url);
      return res
        .status(200)
        .json({ message: "please Confirm the link send throug the email" });
    }
    req.User = decoded;
    next();
  });
};

jwthandler.Singtoken = Singtoken;
jwthandler.Verifytoken = Verifytoken;

module.exports = jwthandler;
