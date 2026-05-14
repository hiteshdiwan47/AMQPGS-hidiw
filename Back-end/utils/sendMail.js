const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
});

const sendMail = async (to, subject, html) => {

  try {

    await transporter.sendMail({
      from: "diwanhitesh99@gmail.com",
      to,
      subject,
      html
    });

    console.log("✅ Email Sent");

  } catch (error) {

    console.log("❌ Mail Error:", error);

  }

};

module.exports = sendMail;