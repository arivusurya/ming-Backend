const Nodemailer = require("nodemailer");

const UserVerifyEmail = (firstname, Useremail, url) => {
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
    subject: "User Verification",
    text: `Subject: Account Verification - Action Required

    Dear ${firstname},
    
    To enhance the security of our platform, we have implemented a new account verification process. 
    
    Please follow the link provided to verify your account: 
    click this : ${url}
    . This link is unique to your account and expires in 24 hours. Failure to verify within this timeframe will require a new link.
    
    Once you click the verification link, you will be directed to a secure webpage where you must enter your account credentials to confirm your identity and protect against unauthorized access.
    
    If you didn't initiate this verification process or received this email by mistake, disregard it; no action is necessary.
    
    For questions or assistance during the verification process, contact our support team at [support email or phone number].
    
    Thank you for your cooperation in maintaining the security of your account.
    
    Best regards,
    
    Ares,
    MingMorshels
    000000000000`,
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
