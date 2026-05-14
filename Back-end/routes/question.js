const router = require("express").Router();
const Question = require("../models/Question");

// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const data = await Question.find()
     .limit(100) 
      .populate("subjectId", "name subjectCode") // ✅ important
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    console.log("❌ GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= GET BY SUBJECT =================
router.get("/subject/:subjectId", async (req, res) => {
  try {
    const data = await Question.find({
      subjectId: req.params.subjectId
    }).populate("subjectId", "name");

    res.json(data);

  } catch (err) {
    console.log("❌ SUBJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= ADD =================
router.post("/", async (req, res) => {
  try {

    const {
      question,
      subjectId,
      subjectCode,
      classId,
      semester,
      unit,
      type,
      marks
    } = req.body;

    // ✅ VALIDATION
    if (!question || !subjectId || !subjectCode || !classId || !semester || !unit || !type || !marks) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const q = new Question(req.body);
    await q.save();

    res.json({ message: "Question Added ✅" });

  } catch (err) {
    console.log("🔥 ADD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= UPDATE =================
router.put("/:id", async (req, res) => {
  try {

   await Question.findByIdAndUpdate(
  req.params.id,
  { $set: req.body },
  { new: true }
);

    res.json({ message: "Updated ✅" });

  } catch (err) {
    console.log("🔥 UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {

    await Question.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted ✅" });

  } catch (err) {
    console.log("🔥 DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;