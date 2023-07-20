require("dotenv").config();
const axios = require("axios");
const ShipToken = require("../models/shiprocket.model");

const IntiateToken = async () => {
  console.log("token is going to be requested");
  const { data } = await axios.post(
    process.env.SHIPROCKET_LOGIN,
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
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
    process.env.SHIPROCKET_LOGIN,
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
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
