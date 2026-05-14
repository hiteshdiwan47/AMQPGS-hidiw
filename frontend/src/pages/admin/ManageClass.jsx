import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/manageClass.css";

export default function Classes() {

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course: "",
    branch: "",
   // semester: ""
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchC();
  }, []);

  // ================= FETCH =================
  const fetchC = async () => {
    setLoading(true);
    try {
      const res = await axios.get("${API_URL}/api/class");
      setClasses(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // ================= HANDLE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE =================
  const handleSave = async () => {

    const { course, branch, //semester
 } = form;

    if (!course || !branch )//|| !semester 
    {
      alert("⚠ Fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `${API_URL}/api/class/${editId}`,
          form
        );
      } else {
        await axios.post(
          "${API_URL}/api/class",
          form
        );
      }

      resetForm();
      fetchC();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (c) => {
    setForm({
      course: c.course,
      branch: c.branch,
      //semester: c.semester
    });
    setEditId(c._id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete class?")) return;

    await axios.delete(`${API_URL}/api/class/${id}`);
    fetchC();
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      course: "",
      branch: "",
      //semester: ""
    });
    setEditId(null);
  };

  // ================= SEARCH =================
  const filtered = classes.filter(c =>
    c.course.toLowerCase().includes(search.toLowerCase()) ||
    c.branch.toLowerCase().includes(search.toLowerCase()) 
   // String(c.semester).includes(search)
  );

  return (
    <div className="conntainer">

      <h2>📚 Class Management</h2>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search course / branch / semester"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔥 FORM */}
      <div className="form">

        <input
          name="course"
          placeholder="Enter Course (B.Tech / BCA)"
          value={form.course}
          onChange={handleChange}
        />

        <input
          name="branch"
          placeholder="Enter Branch (CSE / AIML / IT)"
          value={form.branch}
          onChange={handleChange}
        />

      {/*  <input
          name="semester"
          type="number"
          placeholder="Enter Semester"
          value={form.semester}
          onChange={handleChange}
        /> */}

        <button onClick={handleSave}>
          {editId ? "🔄 Update" : "➕ Add"}
        </button>

        {editId && (
          <button onClick={resetForm}>
           ❌ Cancel
          </button>
        )}
      </div>

      {/* 🔥 LIST */}
      {loading ? <p>Loading...</p> : (

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Course</th>
              <th>Branch</th>
        
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(c => (
              <tr key={c._id}>
                <td>{c.course}</td>
                <td>{c.branch}</td>
                {/*<td>{c.semester}</td> */}

                <td>
                  <button onClick={() => handleEdit(c)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(c._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}