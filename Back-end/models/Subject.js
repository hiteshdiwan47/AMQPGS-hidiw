const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String,
     required: true },

  subjectCode: { type: String,
     required: true },

  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  course: {
    type: String,
    required: true
  },

  semester: {
    type: Number,
    required: true,
    ref: "Class",
  },
  branch : {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);