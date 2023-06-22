const jwt = require("jsonwebtoken");
const decodeJWT = require("jwt-decode");
const Admin = require("../models/admin.model");

const User = require("../models/user.model");

const utils = {};

utils.generateToken = (userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SCRECT);
  return token;
};

utils.adminToken = (adminId) => {
  const token = jwt.sign({ adminId: adminId }, process.env.JWT_SCRECT);
  return token;
};

utils.validateUser = async (req, res, next) => {
  try {
    if (req.headers["authorization"]?.split(" ")?.[1]) {
      const user = decodeJWT(req.headers["authorization"]?.split(" ")?.[1]);
      if (!user?.userId)
        return res.status(401).json({
          statusCode: 401,
          message: "Auth Failed",
        });
      const userVlaue = await User.findOne({
        where: {
          userId: user?.userId,
        },
      });
      if (!userVlaue) {
        return res.status(401).json({
          statusCode: 401,
          message: "Auth Failed",
        });
      } else {
        req.user = userVlaue;
      }
      next();
    } else {
      return res.status(401).json({
        statusCode: 401,
        message: "Auth Failed",
      });
    }
  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      message: "Auth Failed",
    });
  }
};

utils.validateAdmin = async (req, res, next) => {
  try {
    if (req.headers["authorization"]?.split(" ")?.[1]) {
      const admin = decodeJWT(req.headers["authorization"]?.split(" ")?.[1]);
      if (!admin?.adminId)
        return res.status(401).json({
          statusCode: 401,
          message: "Auth Failed",
        });
      const adminValue = await Admin.findOne({
        where: {
          adminId: admin?.adminId,
        },
      });
      if (!adminValue) {
        return res.status(401).json({
          statusCode: 401,
          message: "Auth Failed",
        });
      } else {
        req.admin = adminValue;
      }
      next();
    } else {
      return res.status(401).json({
        statusCode: 401,
        message: "Auth Failed",
      });
    }
  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      message: "Auth Failed",
    });
  }
};

module.exports = utils;
