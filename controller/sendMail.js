const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "demo00629@gmail.com",
    pass: ""
  }
});

