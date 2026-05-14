const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sendMail = require("../utils/sendMail");

// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashed
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Registration Failed"
    });

  }

});

// ================= LOGIN =================


 router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= FORGOT PASSWORD =================

router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered"
      });
    }

    // RESET LINK
    const resetLink =
      `http://localhost:5173/reset-password/${email}`;

    // SEND MAIL
    await sendMail(
      email,
      "Reset Password",
      `Click this link to reset your password:\n\n${resetLink}`
    );

    res.status(200).json({
      success: true,
      message: "Reset link sent to email"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to send email"
    });

  }

});

// ================= RESET PASSWORD =================

router.post("/reset-password", async (req, res) => {

  try {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword
      }
    );

    res.status(200).json({
      success: true,
      message: "Password Updated Successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Password Reset Failed"
    });

  }

});

module.exports = router;