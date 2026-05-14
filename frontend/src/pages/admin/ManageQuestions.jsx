import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/manageQuestions.css";

export default function ManageQuestions() {

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    questionText: "",
    type: "objective",
    difficulty: "easy",
    subjectId: "",
    subjectCode: "",
    classId: "",
    semester: "",
    unit: "unit1",
    marks: 1,
    options: ["", "", "", ""],
    answer: ""
  });

  const [editId, setEditId] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qRes, sRes] = await Promise.all([
        axios.get("${API_URL}/api/question"),
        axios.get("${API_URL}/api/subject")
      ]);

      setQuestions(qRes.data);
      setSubjects(sRes.data);

    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // ================= CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (val, i) => {
    const updated = [...form.options];
    updated[i] = val;
    setForm({ ...form, options: updated });
  };

  // ================= SUBJECT SELECT =================
  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;

    const selected = subjects.find(s => s._id === subjectId);

    setForm({
      ...form,
      subjectId,
      subjectCode: selected?.subjectCode || "",
      classId: selected?.classId || "",
      semester: selected?.semester || ""
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      questionText: "",
      type: "objective",
      difficulty: "easy",
      subjectId: "",
      subjectCode: "",
      classId: "",
      semester: "",
      unit: "unit1",
      marks: 1,
      options: ["", "", "", ""],
      answer: ""
    });
    setEditId(null);
  };

  // ================= VALIDATION =================
  const validate = () => {
    if (!form.questionText) return alert("Enter question ❌");
    if (!form.subjectId) return alert("Select subject ❌");
    if (!form.unit) return alert("Select unit ❌");

    if (form.type === "objective") {
      if (form.options.some(o => !o)) return alert("Fill all options ❌");
      if (!form.answer) return alert("Enter correct answer ❌");
    }

    return true;
  };

  // ================= SAVE =================
  const saveQuestion = async () => {

    if (!validate()) return;

    const payload = {
      question: form.questionText,
      subjectId: form.subjectId,
      subjectCode: form.subjectCode,
      classId: form.classId,
      semester: form.semester,
      unit: form.unit,
      difficulty: form.difficulty,
      type: form.type,
      marks: form.marks,
      options: form.type === "objective" ? form.options : [],
      answer: form.type === "objective" ? form.answer : ""
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/api/question/${editId}`, payload);
      } else {
        await axios.post("${API_URL}/api/question", payload);
      }

      resetForm();
      fetchData();

    } catch (err) {
      console.log(err);
      alert("Save failed ❌");
    }
  };

  // ================= EDIT =================
const editQuestion = (q) => {
  setForm({
    questionText: q.question,
    type: q.type,
    difficulty: q.difficulty,
    subjectId: q.subjectId?._id || q.subjectId,
    subjectCode: q.subjectCode,
    classId: q.classId,
    semester: q.semester,
    unit: q.unit,
    marks: q.marks,
    options: q.options?.length ? q.options : ["", "", "", ""],
    answer: q.answer || ""
  });

  setEditId(q._id);
};

  // ================= DELETE =================
  const deleteQuestion = async (id) => {
    await axios.delete(`${API_URL}/api/question/${id}`);
    fetchData();
  };

  // ================= FILTER =================
  const filtered = questions.filter(q =>
    q.question?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adminquestion-page">

      <h2>Question Manager</h2>

      {/* SEARCH */}
      <input
        className="search-box"
        placeholder="Search question..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <div className="form-box">

        <textarea
          name="questionText"
          placeholder="Enter Question..."
          value={form.questionText}
          onChange={handleChange}
        />

        <div className="row">

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="objective">MCQ</option>
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>

          <select name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select name="unit" value={form.unit} onChange={handleChange}>
            <option value="unit1">Unit 1</option>
            <option value="unit2">Unit 2</option>
            <option value="unit3">Unit 3</option>
            <option value="unit4">Unit 4</option>
            <option value="unit5">Unit 5</option>
          </select>

       <select
  name="marks"
  value={form.marks}
  onChange={(e) =>
    setForm({ ...form, marks: Number(e.target.value) })
  }
>
            <option value={1}>1 Marks</option>
            <option value={5}>5 Marks</option>
            <option value={8}>8 Marks</option>
          </select>

        </div>

        {/* SUBJECT */}
        <select value={form.subjectId} onChange={handleSubjectChange}>
          <option value="">Select Subject</option>
          {subjects.map(s => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.subjectCode})
            </option>
          ))}
        </select>

        {/* AUTO INFO */}
        <div className="info-box">
          <p>📘 Code: {form.subjectCode}</p>
          <p>🎓 Semester: {form.semester}</p>
        </div>

        {/* MCQ */}
        {form.type === "objective" && (
          <div className="mcq">
            {form.options.map((opt, i) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(e.target.value, i)}
              />
            ))}

            <input
              name="answer"
              placeholder="Correct Answer"
              value={form.answer}
              onChange={handleChange}
            />
          </div>
        )}

        <button className="btn" onClick={saveQuestion}>
          {editId ? "🔄 Update" : "➕ Add"} Question
        </button>

      </div>

      {/* LIST */}
      <div className="list">

        {filtered.map(q => (
          <div key={q._id} className="card">

            <h4>{q.question}</h4>

            <p>
              📘 {q.subjectId?.name} | {q.unit} | {q.marks} Marks | {q.difficulty}
            </p>

            {q.type === "objective" && (
              <ul>
                {q.options.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            )}

            <div className="actions">
              <button onClick={() => editQuestion(q)}>✏️ Edit</button>
              <button onClick={() => deleteQuestion(q._id)}>🗑️ Delete</button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}