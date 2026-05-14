const express = require("express");
const sendMail = require("../utils/sendMail");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {

  const { email } = req.body;

  const resetLink =
    `http://localhost:5173/reset-password/${email}`;

  await sendMail(

    email,

    "Reset Password",

    `
      <h2>Reset Your Password</h2>

      <p>Click below button:</p>

      <a href="${resetLink}">
        Reset Password
      </a>
    `
  );

  res.json({
    success: true,
    message: "Reset Email Sent"
  });

});

module.exports = router;