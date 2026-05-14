const mongoose = require("mongoose");
const router = require("express").Router();
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const path = require("path");

const Topic = require("../models/Topic");
const generatePaper = require("../utils/generatePaper");
const Report = require("../models/Report");
const Question = require("../models/Question");
const Subject = require("../models/Subject");

// ================= PATTERN =================
const PAPER_PATTERN = {
  30: {
    objective: 5,
    short: { count: 3, marks: 3 },
    long: { count: 2, marks: 8 }
  },
  70: {
    objective: 5,
    short: { count: 5, marks: 5 },
    long: { count: 8, marks: 8 }
  },
  100: {
    objective: 10,
    short: { count: 10, marks: 5 },
    long: { count: 5, marks: 8 }
  }
};


// ================= SHUFFLE =================
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// ================= FETCH =================
const getQuestions = async (subjectId, type, difficulty, units, count) => {
  return await Question.aggregate([
    {
      $match: {
        subjectId: new mongoose.Types.ObjectId(subjectId),
        type,
        difficulty,
        ...(units.length > 0 && { unit: { $in: units } })
      }
    },
    { $sample: { size: count * 2 } }
  ]);
};

// ================= PAIR =================
const makePairs = (arr, count) => {
  let pairs = [];
  for (let i = 0; i < count * 2; i += 2) {
    if (arr[i]) pairs.push([arr[i], arr[i + 1]]);
  }
  return pairs;
};

// ================= ROUTE =================
router.post("/:id", async (req, res) => {
  try {
    const {
      teacherId,
      course,
      branch,
      semester,
      marks,
      units = [],
      difficulty
    } = req.body;

    const subjectId = req.params.id;

    // VALIDATION
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ message: "Invalid Subject ID ❌" });
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found ❌" });
    }

    const pattern = PAPER_PATTERN[marks];
    if (!pattern) {
      return res.status(400).json({ message: "Invalid marks ❌" });
    }

    // ================= QUESTIONS =================
    let objectiveQ = await getQuestions(subjectId, "objective", difficulty, units, pattern.objective);
    let shortQ = await getQuestions(subjectId, "short", difficulty, units, pattern.short.count);
    let longQ = await getQuestions(subjectId, "long", difficulty, units, pattern.long.count);

{/* let objectiveQ = await getQuestions(subjectId, "objective", difficulty, units, pattern.objective);
let shortQ = await getQuestions(subjectId, "short", difficulty, units, pattern.short.count);
let longQ = await getQuestions(subjectId, "long", difficulty, units, pattern.long.count);
*/}
// 👉 APPLY SHUFFLE HERE
objectiveQ = shuffle(objectiveQ);
shortQ = shuffle(shortQ);
longQ = shuffle(longQ);

    // ================= FALLBACK =================
    if (!objectiveQ.length || !shortQ.length || !longQ.length) {
      const topics = await Topic.find({ subjectId });
      const generated = generatePaper(topics, pattern);

      objectiveQ = generated.filter(q => q.type === "objective");
      shortQ = generated.filter(q => q.type === "short");
      longQ = generated.filter(q => q.type === "long");

        // 👉 SHUFFLE AGAIN
  objectiveQ = shuffle(objectiveQ);
  shortQ = shuffle(shortQ);
  longQ = shuffle(longQ);
    }
{/*
    const shortPairs = makePairs(shortQ, pattern.short.count);
    const longPairs = makePairs(longQ, pattern.long.count);

*/}

const shortPairs = makePairs(shuffle(shortQ), pattern.short.count);
const longPairs = makePairs(shuffle(longQ), pattern.long.count);
    // ================= SAVE REPORT =================
    await Report.create({
      teacherId,
      subjectId,
      course,
      branch,
      semester,
      marks,
      units
    });

    // ================= PDF =================
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=paper.pdf");

    doc.pipe(res);

    // ================= HEADER =================
const drawHeader = async () => {
  const logoPath = path.join(__dirname, "../assets/logo.png");

  // Outer Border
  doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

  // Logo (Left)
  try {
    doc.image(logoPath, 40, 30, { width: 50 });
  } catch {}

  // QR (Right)
try {
  const qrData = JSON.stringify({
    subject: subject.name,
    code: subject.subjectCode,
    marks: marks
  });

  const qrBuffer = await QRCode.toBuffer(qrData, {
    errorCorrectionLevel: 'H'
  });

  doc.image(qrBuffer, doc.page.width - 100, 30, {
    width: 80
  });

} catch (err) {
  console.log("QR Error:", err);
}

  // University Title
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("SARDAR PATEL UNIVERSITY, BALAGHAT", 0, 40, {
      align: "center",
    });

  // Subtitle
  doc
    .fontSize(14)
    .text("EXAMINATION QUESTION PAPER", {
      align: "center",
    });

  doc.moveDown(1.5);

  // ===== DETAILS TABLE STYLE =====
  doc.font("Helvetica").fontSize(12);

  doc.text(`Subject: ${subject.name}`, 50, doc.y);
  doc.text(`Time: 3 Hours`, 400, doc.y);

  doc.text(`Code: ${subject.subjectCode || "N/A"}`, 50);
  doc.text(`Max Marks: ${marks || "N/A"}`, 400);

  doc.text(`Course: ${course || "N/A"}`, 50);
  doc.text(`Semester: ${semester || "N/A"}`, 400);

  doc.text(`Branch: ${branch || "N/A"}`, 50);

  doc.moveDown();

  // Divider Line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();
};

await drawHeader();

// ================= INSTRUCTIONS =================
doc
  .font("Helvetica-Bold")
  .fontSize(13)
  .text("Instructions:", 50, doc.y);

doc.moveDown(0.5);

doc.font("Helvetica").fontSize(11);

// Proper spacing + alignment
const instructions = [
  "1. Attempt all questions.",
  "2. Figures in the margin indicate full marks.",
  "3. Use of unfair means is strictly prohibited.",
  "4. Write answers clearly and neatly.",
  "5. Assume suitable data if necessary."
];

instructions.forEach((line) => {
  doc.text(line, 60);
});

doc.moveDown();

// Divider Line
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown();
    // ================= SECTION A =================
    doc.font("Helvetica-Bold").text("Section A (Objective)" );
    doc.moveDown();

    objectiveQ.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question}`, 50 );

     if (q.options) {
  const shuffledOptions = shuffle([...q.options]);

  shuffledOptions.forEach((opt, idx) => {
    doc.text(`   ${String.fromCharCode(65 + idx)}. ${opt}`, 70);
  });
}

      doc.moveDown(0.5);
    });

    // ================= SECTION B =================
    doc.addPage();
    await drawHeader();

    doc.font("Helvetica-Bold")
      .text(`Section B (${pattern.short.marks} Marks)` ,50);

    doc.moveDown();

    let qNo = 1;

    shortPairs.forEach(([q1, q2]) => {
      doc.text(`${qNo}. ${q1?.question || "Question missing"}`, 50);

      if (q2) {
        doc.text("OR");
        doc.text(`${qNo}. ${q2.question}`);
      }

      qNo++;
      doc.moveDown();
    });

    // ================= SECTION C =================
    doc.addPage();
    await drawHeader();

    doc.font("Helvetica-Bold")
      .text(`Section C (${pattern.long.marks} Marks)}`,50);

    doc.moveDown();

    let count = 0;

longPairs.forEach(([q1, q2]) => {
  if (count >= 10) return;

  doc.text(`${qNo}. ${q1?.question}`, 50);
  count++;

  if (q2 && count < 10) {
    doc.text("OR");
    doc.text(`${qNo}. ${q2.question}`);
    count++;
  }

  qNo++;
  doc.moveDown();
});
    doc.end();

  } catch (err) {
    console.log("🔥 ERROR:", err);

    if (!res.headersSent) {
      res.status(500).json({ message: "Error generating paper" });
    }
  }
});

module.exports = router;