const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
 adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },

  // ✅ FIXED FIELDS
  subject: {
    type: String
  },

  course: {
    type: String
  },

  branch: {
    type: String
  },

  semester: {
    type: Number
  },

  action: {
    type: String,
    enum: ["generate", "download"],
    default: "generate"
  },

  marks: {
    type: Number
  },

  units: {
    type: [String]
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Report", reportSchema);