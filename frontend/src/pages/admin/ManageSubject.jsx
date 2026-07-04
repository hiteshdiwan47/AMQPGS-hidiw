import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/manageSubject.css";

export default function ManageSubject() {

  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    name: "",
    subjectCode: "",
    course: "",
    branch: "",
    semester: ""
  });

  const [editId, setEditId] = useState(null);

  // FETCH
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const res = await axios.get("${API_URL}/api/subject");
    setSubjects(res.data);
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // SAVE
  const handleSave = async () => {
    const { name, subjectCode, course, branch, semester } = form;

    if (!name || !subjectCode || !course || !branch || !semester) {
      alert("⚠ Fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `${API_URL}/api/subject/${editId}`,
          {
            ...form,
            semester: Number(semester)
          }
        );
      } else {
        await axios.post(
          "${API_URL}/api/subject",
          {
            ...form,
            semester: Number(semester)
          }
        );
      }

      resetForm();
      fetchSubjects();

    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error");
    }
  };

  // EDIT
  const handleEdit = (s) => {
    setForm({
      name: s.name,
      subjectCode: s.subjectCode,
      course: s.course,
      branch: s.branch,
      semester: s.semester
    });

    setEditId(s._id);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete subject?")) return;

    await axios.delete(`${API_URL}/api/subject/${id}`);
    fetchSubjects();
  };

  // RESET
  const resetForm = () => {
    setForm({
      name: "",
      subjectCode: "",
      course: "",
      branch: "",
      semester: ""
    });
    setEditId(null);
  };

  return (
    <div className="con-tainer">

      <h2>📚 Manage Subjects</h2>

      {/* FORM */}
      <div className="form">

        <input
          name="name"
          placeholder="Subject Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="subjectCode"
          placeholder="Subject Code"
          value={form.subjectCode}
          onChange={handleChange}
        />

        <select name="course" value={form.course} onChange={handleChange}>
          <option value="">Select Course</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
        </select>

        <select name="branch" value={form.branch} onChange={handleChange}>
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="AIML">AIML</option>
          <option value="General">General</option>
        </select>

        <select name="semester" value={form.semester} onChange={handleChange}>
          <option value="">Select Semester</option>
          {[1,2,3,4,5,6,7,8].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button onClick={handleSave}>
          {editId ? "🔄 Update" : "➕ Add"} Subject
        </button>

        {editId && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Course</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.subjectCode}</td>
              <td>{s.course}</td>
              <td>{s.branch}</td>
              <td>{s.semester}</td>

              <td>
                <button onClick={() => handleEdit(s)}>✏️ EDIT</button>
                <button onClick={() => handleDelete(s._id)}>🗑️ DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}