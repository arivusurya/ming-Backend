const express = require("express");
const User = require("../model/User.model");
const otp = require("otp-generator");

const OtpEmail = require("../helper/OtpEmail");
const { Console } = require("winston/lib/winston/transports");

const router = express();

router.get("/require-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const code = otp.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      const currentDate = new Date();
      const expiretime = new Date(currentDate.getTime() + 10000);
      const otprow = await OTP.findOne({ where: { userid: user.userid } });
      if (otprow) {
        otprow.otp = code;
        otprow.expiresAt = expiretime;
        await otprow.save();
      } else {
        await OTP.create({
          userid: user.userid,
          otp: code,
          expiresAt: expiretime,
        });
      }
      OtpEmail(user.email, code);
      res.status(200).json({ message: "We send the otp in mail" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    const currentDate = new Date();

    if (!user) {
      return res.status(404).json({ message: "No User Found On this email" });
    }
    const otprow = await OTP.findOne({ where: { userid: user.userid } });
    console.log(otprow.otp);
    console.log(otp);
    console.log(otprow.otp === otp);
    if (otprow.otp === otp) {
      if (otprow.expiresAt < new Date(currentDate.getTime())) {
        console.log(otprow.expiresAt);
        console.log(new Date(currentDate.getTime()));
        return res.status(200).json({ message: "Otp Verified" });
      } else {
        return res.status(400).json({ message: "OTP Expired" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Otp" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internel server error" });
  }
});

module.exports = router;
