const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  subjectName: String,  // ✅ FIXED

  subjectCode: String,  // ✅ FIXED

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },
  classId:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Class",
     required: true
  },

  semester: {
    type: Number,
    ref: "Class", 
     required: true  // ✅ FIXED
  },

  unit: {
    type: String,
    enum: ["unit1", "unit2", "unit3", "unit4", "unit5"]
  },

  topic: String
});

module.exports = mongoose.model("Topic", topicSchema);