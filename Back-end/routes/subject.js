const router = require("express").Router();
const Subject = require("../models/Subject");
const Class = require("../models/Class");

// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const data = await Subject.find()
      .populate("classId", "course branch semester");

    res.json(data);
  } catch (err) {
    console.log("🔥 GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= GET ONE =================
router.get("/:id", async (req, res) => {
  try {
    const data = await Subject.findById(req.params.id)
      .populate("classId", "course branch semester");

    if (!data) {
      return res.status(404).json({ message: "Subject not found ❌" });
    }

    res.json(data);
  } catch (err) {
    console.log("🔥 GET ONE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= ADD SUBJECT =================
router.post("/", async (req, res) => {
  try {
    const { name, subjectCode, course, branch, semester } = req.body;

    // ✅ VALIDATION
    if (!name || !subjectCode || !course || !branch || !semester) {
      return res.status(400).json({
        message: "All fields are required ❌"
      });
    }

    // ✅ CLASS FIND / CREATE
    let cls = await Class.findOne({ course, branch, semester });

    if (!cls) {
      cls = await Class.create({ course, branch, semester });
    }

    // ✅ DUPLICATE CHECK
    const existing = await Subject.findOne({
      subjectCode,
      course,
      branch,
      semester
    });

    if (existing) {
      return res.status(400).json({
        message: "Subject already exists ❌"
      });
    }

    // ✅ CREATE SUBJECT
    const subject = await Subject.create({
      name,
      subjectCode,
      course,
      branch,
      semester,
      classId: cls._id
    });

    res.json({
      message: "Subject Added ✅",
      data: subject
    });

  } catch (err) {
    console.log("🔥 ADD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= UPDATE =================
router.put("/:id", async (req, res) => {
  try {
    const { name, subjectCode, course, branch, semester } = req.body;

    // ✅ VALIDATION
    if (!name || !subjectCode || !course || !branch || !semester) {
      return res.status(400).json({
        message: "All fields required ❌"
      });
    }

    // ✅ CLASS FIND / CREATE
    let cls = await Class.findOne({ course, branch, semester });

    if (!cls) {
      cls = await Class.create({ course, branch, semester });
    }

    // ✅ UPDATE
    const updated = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        name,
        subjectCode,
        course,
        branch,
        semester,
        classId: cls._id
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Subject not found ❌"
      });
    }

    res.json({
      message: "Updated Successfully ✅",
      data: updated
    });

  } catch (err) {
    console.log("🔥 UPDATE ERROR:", err);
    res.status(500).json({
      message: err.message
    });
  }
});
// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted ✅"
    });

  } catch (err) {
    console.log("🔥 DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;