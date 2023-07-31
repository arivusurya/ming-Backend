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
