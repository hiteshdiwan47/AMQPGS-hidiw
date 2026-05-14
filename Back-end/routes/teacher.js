const router = require("express").Router();
const User = require("../models/User");

// GET
router.get("/", async (req, res) => {
  const teachers = await User.find({ role: "teacher" });
  res.json(teachers);
});

// ADD
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const teacher = new User({
      name,
      email,
      password,
      role: "teacher"   // ✅ FIX HERE
    });

    await teacher.save();

    res.json(teacher);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving teacher" });
  }
});
// UPDATE
router.put("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// DELETE
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;