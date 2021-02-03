var nodemailer = require("nodemailer");
require("dotenv").config();
var transporter = nodemailer.createTransport({
  service: process.env.SERVICEUSER,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

var mailOptions = {
  from: process.env.USER,
  to: process.env.CLIENT,
  subject: "Verification ",
  text: `Verification Code`,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
