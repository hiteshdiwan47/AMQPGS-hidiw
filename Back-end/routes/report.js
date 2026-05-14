const router = require("express").Router();
const Report = require("../models/Report");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");


// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const data = await Report.find()
      .populate("teacherId", "name email")
      .populate("subjectId", "name subjectCode"); // 🔥 FIX

    res.json(data);

  } catch (err) {
    console.log("🔥 GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    await Report.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({ message: "Report Updated ✅" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= CSV EXPORT =================
router.get("/export/csv", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("teacherId")
      .populate("adminId")
      .populate("subjectId", "name"); // 🔥 FIX

    let csv = "Teacher,Email,Subject,Course,Branch,Semester,Marks,Date\n";

    reports.forEach(r => {

      const subjectName =
        r.subjectId?.name || r.subject || "N/A";

      csv += `${r.teacherId?.name || ""},`;
      csv += `${r.teacherId?.email || ""},`;
      csv += `${subjectName},`; // 🔥 FIX
      csv += `${r.course || ""},`;
      csv += `${r.branch || ""},`;
      csv += `${r.semester || ""},`;
      csv += `${r.marks || ""},`;
      csv += `${new Date(r.createdAt).toLocaleString()}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=reports.csv");

    res.send(csv);

  } catch (err) {
    console.log(err);
    res.status(500).send("CSV Export Error");
  }
});


// ================= EXCEL EXPORT =================
router.get("/export/excel", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("teacherId")
      .populate("subjectId", "name"); // 🔥 FIX

    const data = reports.map(r => ({
      Teacher: r.teacherId?.name,
      Email: r.teacherId?.email,
      Subject: r.subjectId?.name || r.subject || "N/A", // 🔥 FIX
      Course: r.course,
      Branch: r.subjectId?.branch,
      Semester: r.semester,
      Marks: r.marks,
      Date: new Date(r.createdAt).toLocaleString()
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Reports");

    const buffer = XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx"
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reports.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);

  } catch (err) {
    console.log(err);
    res.status(500).send("Excel Export Error");
  }
});


// ================= PDF GENERATE =================
router.get("/pdf/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("teacherId")
      .populate("adminId")
      .populate("subjectId", "name"); // 🔥 FIX

    const subjectName =
      report.subjectId?.name || report.subject || "N/A";

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=report_${req.params.id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text("Report Details", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Teacher: ${report.teacherId?.name}`);
    doc.text(`Email: ${report.teacherId?.email}`);
    doc.text(`Subject: ${subjectName}`); // 🔥 FIX
    doc.text(`Course: ${report.course}`);
    doc.text(`Branch: ${report.branch}`);
    doc.text(`Semester: ${report.semester}`);
    doc.text(`Marks: ${report.marks}`);
    doc.text(`Units: ${report.units?.join(", ")}`);
    doc.text(`Action: ${report.action}`);
    doc.text(`Date: ${new Date(report.createdAt).toLocaleString()}`);

    doc.end();

  } catch (err) {
    console.log(err);
    res.status(500).send("PDF Error");
  }
});

module.exports = router;