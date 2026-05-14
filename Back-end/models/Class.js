const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {   // ✅ ADD THIS
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  course: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  semester: {
    type: Number,  // ✅ FIXED
    required: true
  },
  
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);