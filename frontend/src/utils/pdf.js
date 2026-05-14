import jsPDF from "jspdf";

export function downloadPDF(questions, subject) {
  const doc = new jsPDF();

  // College Header
  doc.setFontSize(16);
  doc.text("Sardar Patel University Balaghat", 35, 10);

  doc.setFontSize(12);
  doc.text(`Subject: ${subject?.name}`, 10, 20);
  doc.text(`Code: ${subject?.code}`, 150, 20);

  // Instructions
  doc.text("Instructions:", 10, 30);
  doc.text("1. All questions are compulsory.", 10, 36);
  doc.text("2. Attempt all questions.", 10, 42);
  doc.text("3. Marks are mentioned.", 10, 48);

  let y = 60;

  // Questions
  questions.forEach((q, i) => {
    doc.text(`${i + 1}. ${q.question} (${q.marks})`, 10, y);
    y += 10;
  });

  doc.save(`${subject?.name}_Paper.pdf`);
}