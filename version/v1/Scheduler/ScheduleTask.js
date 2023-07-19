const axios = require("axios");
require("dotenv").config();
const ShipToken = require("../models/shiprocket.model");

const IntiateToken = async () => {
  console.log("token is going to be requested");
  const { data } = await axios.post(
    process.env.shiprocketlogin,
    {
      email: process.env.shiprocketemail,
      password: process.env.shiprocketpass,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const token = await ShipToken.findOne();

  if (token !== null) {
    token.token = data.token;
    await token.save();
  } else {
    token = await ShipToken.create({
      token: data.token,
    });
  }
};

const TokenCollector = async () => {
  const { data } = await axios.post(
    process.env.shiprocketlogin,
    {
      email: process.env.shiprocketemail,
      password: process.env.shiprocketpass,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("login called");

  const token = await ShipToken.findOne();
  token.token = data.token;
  await token.save();
};

module.exports = { TokenCollector, IntiateToken };
