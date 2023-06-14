const Nodemailer = require("nodemailer");

const SendEmail = (Useremail) => {
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
    Text: `Dear [Customer Name],

    Thank you for your recent order with [Your Company Name]. This email serves as confirmation of your purchase.
    
    Order Details:
    Order ID: [Order ID]
    Product Name: [Product Name]
    Payment Amount: [Payment Amount]
    
    We have successfully received your payment and will now begin processing your order. Once your order is dispatched, you will receive a shipping notification with tracking information.
    
    If you have any questions or require assistance, please don't hesitate to reach out to our customer support team.
    
    Thank you for choosing Mingmorsels. We appreciate your business!
    
    Best regards,
    ${"Mingmorsels"}`,
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = SendEmail;
