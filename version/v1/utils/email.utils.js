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

utils.PaymentVerifed = async (email, order, order_items) => {
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
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Purchase Verification and Thank You</title>
      </head>
      
      <body>
          <h1>Dear [Customer Name],</h1>
      
          <p>We hope this email finds you well. We want to express our sincere gratitude for choosing to shop with us. Your recent purchase has been successfully processed, and we're excited to confirm your order details.</p>
          <img src="https://res.cloudinary.com/dgxkm6xef/image/upload/v1685541212/Mingmorsels_large_lp0ucw.svg" />
      
          <h2>Purchase Verification:</h2>
          <ul>
              <li><strong>Order Id:</strong> ${order?.orderId}</li>
              <li><strong>Order Date:</strong> ${order?.date}</li>
          </ul>
      
          <h2>Product Details:</h2>
          <ul>${order_items?.map((e) => (
            <li>
              <strong>${e?.name}:</strong> ${e?.quantity} x ${e?.amount}
            </li>
          ))}
              
              
          </ul>
      
          <p><strong>Order Total:</strong> ${order?.date}</p>
          <h2>Thank You:</h2>
          <p>We value your trust in our products and services. Our team is working diligently to ensure your order is carefully packed and delivered to you as soon as possible. We will notify you once your order is dispatched.</p>
      
          <p>If you have any questions or require further assistance, please don't hesitate to reach out to our customer support team at [Customer Support Email] or [Customer Support Phone Number]. We are here to help!</p>
      
          <p>Thank you once again for choosing us. We look forward to serving you again in the future.</p>
      
          <p>Best regards,</p>
          <p>MingMorsels</p>
          <p>7339213046</p>
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
