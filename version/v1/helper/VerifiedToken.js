const Jwt = require("jsonwebtoken");
require("dotenv").config();
const VerifiedToken = (payload) => {
  const expiresIn = "1d";
  const token = Jwt.sign({ email: payload.email }, process.env.jwtsecert, {
    expiresIn,
  });
  let url = `http://localhost:5000/api/confirmation/${token}`;
  return url;
};

module.exports = VerifiedToken;
