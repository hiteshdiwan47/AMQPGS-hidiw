const router = require("express").Router();
const Class = require("../models/Class");

// CREATE
router.post("/", async (req, res) => {
  try {
    const { course, branch, semester } = req.body;

    if (!course || !branch || !semester) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const newClass = new Class({ course, branch, semester });
    await newClass.save();

    res.json(newClass);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating class" });
  }
});

// GET
router.get("/", async (req, res) => {
  const data = await Class.find().sort({ createdAt: -1 });
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { course, branch, semester } = req.body;

  const updated = await Class.findByIdAndUpdate(
    req.params.id,
    { course, branch, semester },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;