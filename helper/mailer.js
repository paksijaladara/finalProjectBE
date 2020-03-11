const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "paksiiskap@gmail.com",
    pass: "uailvpgykgnhizsv"
  },
  tls: {
    rejectedUnauthorized: false
  }
});

module.exports = transporter;
