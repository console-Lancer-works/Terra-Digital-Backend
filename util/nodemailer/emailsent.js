const nodemailer = require("nodemailer");

exports.sendMail = async (MailBody) => {
  let transporter = nodemailer.createTransport(this.transporterOptions());

  let mailOptions = this.mailOptions(
    "vyash5075@gmail.com" /*MailBody.email_to*/,
    this.template(MailBody),
    this.getSubject(MailBody.type)
  );

  let mailInfo = await transporter.sendMail(mailOptions);

  if (!mailInfo) return false;

  return true;
};

exports.transporterOptions = () => {
  return {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  };
};

exports.mailOptions = (email, html, subject) => {
  return {
    from: process.env.MAIL_FROM,
    to: email,
    subject: subject,
    html: html,
  };
};
exports.template = (MailBody) => {
  switch (MailBody.type) {
    case "EVC":
      return require("./Templates/emailVerificationCode")(MailBody);
    case "FP":
      return require("./Templates/forgotpassword")(MailBody);
  }
  return true;
};
exports.getSubject = (type) => {
  switch (type) {
    case "EVC":
      return "Verify Your Email";
    case "FP":
      return "Reset Your Password";
  }
};
