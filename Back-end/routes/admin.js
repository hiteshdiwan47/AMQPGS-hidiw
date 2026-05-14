const router = require("express").Router();
const Teacher = require("../models/User");
const Subject = require("../models/Subject");
const Question = require("../models/Question");
const Class = require("../models/Class");
const Report = require("../models/Report");

// 🔥 ANALYTICS API
router.get("/analytics", async (req, res) => {
  try {

    const filter = req.query.filter;

    // ✅ COUNTS
    const teachers = await Teacher.countDocuments({ role: "teacher" });
    const subjects = await Subject.countDocuments();
    const questions = await Question.countDocuments();
    const classes = await Class.countDocuments();

    // ✅ ACTIVITY (LAST 7 DAYS)
    const activity = await Report.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          count: { $sum: 1 }
        }
      }
    ]);

    const daysMap = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const formattedActivity = activity.map(a => ({
      day: daysMap[a._id - 1],
      count: a.count
    }));

    // ✅ TOP SUBJECTS
    const topSubjects = await Question.aggregate([
      {
        $group: {
          _id: "$subjectCode",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const formattedSubjects = topSubjects.map(s => ({
      subject: s._id,
      count: s.count
    }));

    res.json({
      counts: { teachers, subjects, questions, classes },
      activity: formattedActivity,
      topSubjects: formattedSubjects
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;