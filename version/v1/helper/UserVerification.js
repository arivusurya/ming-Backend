const Nodemailer = require("nodemailer");

const UserVerifyEmail = (Useremail, url) => {
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
    subject: "Order confirmation",
    text: `${url}`,
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = UserVerifyEmail;
