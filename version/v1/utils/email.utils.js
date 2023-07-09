const nodemailer = require("nodemailer");
const { htmlToText } = require("nodemailer-html-to-text");

utils = {};

utils.sendEmail = async (email, subject, url) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      post: 587,
      secure: true,
      auth: {
        user: process.env.BASE_USERNAME,
        pass: process.env.BASE_PASSWORD,
      },
    });
    transport.use("compile", htmlToText());

    const emailTemplate = (url) => {
      return `
          <html>
            <head>
              <style>
                /* Add your custom styles here */
              </style>
            </head>
            <body>
              <p>Hi,</p>
              <p>Thank you for registering on our site. To verify your email address, please copy the below link:</p>
              <p>${url}</p>
              <p>If you did not request this verification, please ignore this email.</p>
            </body>
          </html>
        `;
    };

    await transport.sendMail({
      from: "gandhigoku02@gmail.com",
      to: email,
      subject: subject,
      html: emailTemplate(url),
    });
    console.log(`Email send Successfully`);
  } catch (error) {
    console.log(`Email Not Send`);
    console.log(error);
  }
};

module.exports = utils;
