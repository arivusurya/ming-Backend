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

utils.PaymentVerifed = async (email, userName, order, order_items) => {
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

    const emailTemplate = () => {
      return `
      <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Received</title>
</head>

<body>
  <h1>Dear ${userName},</h1>

  <p>We hope this email finds you well. We are writing to inform you that we have received your payment for the recent order you placed with us. Your payment has been successfully processed, and we're excited to process your order.</p>

  <h2>Order Details:</h2>
  <ul>
    <li><strong>Order ID : </strong>  ${order?.orderId}</li>
    <li><strong>Order Date : </strong> ${order?.date}</li>
  </ul>
  <h2>Product Details:</h2>
  <ul>
  ${order_items?.map(
    (e) => `<li><strong>${e?.name}:</strong> ${e?.quantity} x ${e?.price}</li>`
  )}
  </ul>
  

  <p><strong>Order Total:</strong> ${order?.amount}</p>

  <p>We will now start processing your order and ensure that it is carefully packed and dispatched to you as soon as possible. You will receive a confirmation email once your order is on its way.</p>

  <p>If you have any questions or require further assistance, please don't hesitate to reach out to our customer support team at [Customer Support Email] or [Customer Support Phone Number]. We are here to help!</p>

  <p>Thank you for choosing us as your preferred shopping destination. We look forward to serving you again in the future.</p>

  <p>Best regards,</p>
</body>

</html>

      
        `;
    };

    await transport.sendMail({
      from: "arivusurya3501@gmail.com",
      to: email,
      subject: "Thank You - For Shopping With US",
      html: emailTemplate(),
    });
    console.log(`Email send Successfully`);
  } catch (error) {
    console.log(`Email Not Send`);
    console.log(error);
  }
};

module.exports = utils;
