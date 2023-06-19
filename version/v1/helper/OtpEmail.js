const Nodemailer = require("nodemailer");
const { Emaillogger, logger } = require("../logger/logger");

const OtpEmail = (Useremail, code) => {
  const transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.emailpass,
    },
  });

  const mailOption = {
    from: process.env.email,
    to: Useremail,
    subject: "Account Verification - Action Required",
    text: `${code}`,
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      logger.error(err);
      console.log(err);
    } else {
      Emaillogger.info(info);
      console.log(info);
    }
  });
};

module.exports = OtpEmail;
