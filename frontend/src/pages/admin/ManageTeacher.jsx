import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/manageTeacher.css";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📦 FETCH
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/teacher");
      setTeachers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 💾 ADD / UPDATE
  const handleSave = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/teacher/${editId}`, {
          name,
          email,
          password
        });
      } else {
        await axios.post("http://localhost:5000/api/teacher", {
          name,
          email,
          password,
          role : "teacher"
        });
      }

      resetForm();
      fetchTeachers();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // ✏️ EDIT
  const handleEdit = (t) => {
    setName(t.name);
    setEmail(t.email);
    setPassword(t.password);
    setEditId(t._id);
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this teacher?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/teacher/${id}`);
      fetchTeachers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🔄 RESET
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setEditId(null);
  };

  return (
    <div className="admin-page">

      <h2 className="page-title">👨‍🏫 Manage Teachers</h2>

      {/* FORM */}
      <div className="form-box">
        <input
          placeholder="Enter teacher name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <input
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="btn-row">
          <button className="btn-primary" onClick={handleSave}>
            {editId ? "🔄 Update Teacher" : "➕ Add Teacher"}
          </button>

          {editId && (
            <button className="btn-secondary" onClick={resetForm}>
            ❌ Cancel
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="table-box">
        {loading ? (
          <p>Loading teachers...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.length > 0 ? (
                teachers.map((t) => (
                  <tr key={t._id}>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(t)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(t._id)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No teachers found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}