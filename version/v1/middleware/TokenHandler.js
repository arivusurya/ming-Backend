const jwt = require("jsonwebtoken");
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
    } else {
      req.User = decoded;

      next();
    }
  });
};

jwthandler.Singtoken = Singtoken;
jwthandler.Verifytoken = Verifytoken;

module.exports = jwthandler;
