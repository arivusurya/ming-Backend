require("dotenv").config();
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
          <meta charset="UTF-8">
          <title>Email Template</title>
          <style type="text/css">
            /* CSS styles go here */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              background-color: #f2f2f2;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: Arial, sans-serif;
              font-weight: bold;
              margin: 0 0 10px;
              line-height: 1.2;
            }
            p {
              margin: 0 0 10px;
            }
            a {
              color: #007bff;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              font-size: 16px;
              font-weight: bold;
              line-height: 1.5;
              color: #fff;
              background-color: #007bff;
              border-radius: 4px;
              text-decoration: none;
            }
            .button:hover {
              background-color: #0069d9;
            }
            .image {
                width : 48px;
                height : 48px;
            }
          </style>
        </head>
        <body>
          <div class="container">
          <img src="https://res.cloudinary.com/dgxkm6xef/image/upload/v1685541212/Mingmorsels_large_lp0ucw.svg" class="image" alt="Logo">
            <h1>Welcome to mingmorsels!</h1>
            <p>Thank you for signing up. We're excited to have you on board!</p>
            <p>Please click the button below to verify your email address:</p>
            <a href="${url}" class="button">Verify Email</a>
            <p>Thanks,</p>
            <p>mingmorsels Team</p>
          </div>
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

utils.orederConfirmation = async (email, subject, url) => {
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
          <meta charset="UTF-8">
          <title>Email Template</title>
          <style type="text/css">
            /* CSS styles go here */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              background-color: #f2f2f2;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: Arial, sans-serif;
              font-weight: bold;
              margin: 0 0 10px;
              line-height: 1.2;
            }
            p {
              margin: 0 0 10px;
            }
            a {
              color: #007bff;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              font-size: 16px;
              font-weight: bold;
              line-height: 1.5;
              color: #fff;
              background-color: #007bff;
              border-radius: 4px;
              text-decoration: none;
            }
            .button:hover {
              background-color: #0069d9;
            }
            .image {
                width : 48px;
                height : 48px;
            }
          </style>
        </head>
        <body>
          <div class="container">
          <img src="https://res.cloudinary.com/dgxkm6xef/image/upload/v1685541212/Mingmorsels_large_lp0ucw.svg" class="image" alt="Logo">
            <h1>Welcome to mingmorsels!</h1>
            <p>Thank you for signing up. We're excited to have you on board!</p>
            <p>Please click the button below to verify your email address:</p>
            <a href="${url}" class="button">Verify Email</a>
            <p>Thanks,</p>
            <p>mingmorsels Team</p>
          </div>
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

utils.resetPassword = async (email, subject, url) => {
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
          <meta charset="UTF-8">
          <title>Email Template</title>
          <style type="text/css">
            /* CSS styles go here */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              background-color: #f2f2f2;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: Arial, sans-serif;
              font-weight: bold;
              margin: 0 0 10px;
              line-height: 1.2;
            }
            p {
              margin: 0 0 10px;
            }
            a {
              color: #007bff;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              font-size: 16px;
              font-weight: bold;
              line-height: 1.5;
              color: #fff;
              background-color: #007bff;
              border-radius: 4px;
              text-decoration: none;
            }
            .button:hover {
              background-color: #0069d9;
            }
            .image {
                width : 48px;
                height : 48px;
            }
          </style>
        </head>
        <body>
          <div class="container">
          <img src="https://res.cloudinary.com/dgxkm6xef/image/upload/v1685541212/Mingmorsels_large_lp0ucw.svg" class="image" alt="Logo">
            <h1>Welcome to mingmorsels!</h1>
            <p>Reset Your Password</p>
            <p>Please click the button below to verify your email address:</p>
            <a href="${url}" class="button">Verify Email</a>
            <p>Thanks,</p>
            <p>mingmorsels Team</p>
          </div>
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
