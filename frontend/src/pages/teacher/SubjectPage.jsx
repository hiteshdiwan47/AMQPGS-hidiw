import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/subjectpage.css";

export default function SubjectPage() {

  const { id } = useParams(); // ✅ only id

  const [subject, setSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [form, setForm] = useState({
    course: "",
    branch: "",
    semester: "",
    marks: 100,
    difficulty: "easy"
  });

  const [units, setUnits] = useState({
    unit1: true,
    unit2: true,
    unit3: true,
    unit4: false,
    unit5: false
  });

  // ✅ FETCH SUBJECT
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/subject/${id}`);
        console.log("SUBJECT:", res.data); // 🔍 debug
        setSubject(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) fetchSubject();
  }, [id]);

  // ✅ FORM CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "marks" || name === "semester"
          ? Number(value)
          : value
    });
  };

  // ✅ TOGGLE UNIT
  const toggleUnit = (unit) => {
    setUnits(prev => ({
      ...prev,
      [unit]: !prev[unit]
    }));
  };

  // ✅ GENERATE PAPER
  const previewPaper = async () => {
    try {
      if (!form.course || !form.branch || !form.semester) {
        alert("⚠ Please select Course, Branch and Semester");
        return;
      }

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const teacherId = user?._id;
      if (!teacherId) {
        alert("User not logged in ❌");
        return;
      }

      const selectedUnits = Object.keys(units).filter(u => units[u]);
      const classId = subject?.classId?._id;

      const res = await axios.post(
        `${API_URL}/api/generate/${id}`,
        {
          teacherId,
          subjectId: id, // ✅ correct
          classId,
          course: form.course,
          branch: form.branch,
          semester: form.semester,
          marks: form.marks,
          difficulty: form.difficulty,
          units: selectedUnits
        },
        { responseType: "blob" }
      );

      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
      }

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );

      setPreviewUrl(url);
      setShowModal(false);

    } catch (err) {
      console.log(err);
      alert("Preview failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // DOWNLOAD
  const downloadPDF = () => {
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "QuestionPaper.pdf";
    a.click();
  };

  // PRINT
  const printPDF = () => {
    const win = window.open(previewUrl);
    win.print();
  };

  return (
    <div className="ma-in">

      <h2>📄 Generate Question Paper</h2>

      {/* ✅ SUBJECT INFO CLEAN */}
      {subject && (
        <div className="subject-info">
          <h2>{subject.name}</h2>

          <p>📘 Code: {subject.subjectCode || "N/A"}</p>
          <p>🎓 Course: {subject.course || "N/A"}</p>
          <p>🏫 Branch: {subject.branch || "N/A"}</p>
          <p>📊 Semester: {subject.semester || "N/A"}</p>
        </div>
      )}

      <button className="generate-btn" onClick={() => setShowModal(true)}>
        Generate Paper
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">

            <h3>⚙ Generate Settings</h3>

            <label>Course</label>
            <select name="course" value={form.course} onChange={handleChange}>
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
            </select>

            <label>Branch</label>
            <select name="branch" value={form.branch} onChange={handleChange}>
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="GENERAL">General</option>
            </select>

            <label>Semester</label>
            <select name="semester" value={form.semester} onChange={handleChange}>
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6,7,8].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <label>Marks</label>
            <select name="marks" value={form.marks} onChange={handleChange}>
              <option value={30}>30</option>
              <option value={70}>70</option>
              <option value={100}>100</option>
            </select>

            <label>Difficulty</label>
            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <label>Select Units</label>
            <div className="units">
              {Object.keys(units).map(u => (
                <label key={u}>
                  <input
                    type="checkbox"
                    checked={units[u]}
                    onChange={() => toggleUnit(u)}
                  />
                  {u.toUpperCase()}
                </label>
              ))}
            </div>

            <div className="modal-buttons">
              <button onClick={previewPaper} disabled={loading}>
                {loading ? "Generating..." : "Preview"}
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PREVIEW */}
      {previewUrl && (
        <div className="preview-container">
          <h3>👀 Preview</h3>
          <iframe src={previewUrl} title="PDF Preview" />

          <button onClick={downloadPDF}>⬇ Download</button>
          <button onClick={printPDF}>🖨 Print</button>
          <button onClick={() => setPreviewUrl(null)}>❌ Close</button>
        </div>
      )}

    </div>
  );
}