const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },

  subjectCode: {
    type: String,
    required: true
  },

  semester: {
    type: Number,
    ref :"Class",
    required: true
  },
classId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Class",
  required: true
},
  unit: {
    type: String,
    required: true,
    enum: ["unit1", "unit2", "unit3", "unit4", "unit5"]
  },

  // ✅ FIXED
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium"
  },

  // ✅ FIXED
  type: {
    type: String,
    enum: ["objective", "short", "long"],
    required: true
  },

  marks: {
    type: Number,
    required: true
  },

  options: {
    type: [String],
    default: []
  },

  answer: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);