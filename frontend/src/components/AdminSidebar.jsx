import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/adminsidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleTheme } from "../utils/theme";

export default function AdminSidebar() {

  const [openMenu, setOpenMenu] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [dark, setDark] = useState(false);
  const [adminName, setAdminName] = useState("");
 
const [counts, setCounts] = useState({
    teachers: 0,
    subjects: 0,
    questions: 0,
    classes: 0
  });



  const navigate = useNavigate();
   useEffect(() => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user) {
    setAdminName(user.name);
  }

}, []);

  // 🔁 MENU TOGGLE
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // 🔐 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 🌙 THEME SYNC
  useEffect(() => {
    const sync = () => {
      setDark(localStorage.getItem("theme") === "dark");
    };

    sync();
    window.addEventListener("theme-change", sync);

    return () => window.removeEventListener("theme-change", sync);
  }, []);

  // 🔥 FETCH COUNTS
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [t, s, q, c] = await Promise.all([
          axios.get("${API_URL}/api/teacher"),
          axios.get("${API_URL}/api/subject"),
          axios.get("${API_URL}/api/question"), // ✅ FIXED
          axios.get("${API_URL}/api/class"),
        ]);

        setCounts({
          teachers: t.data.length,
          subjects: s.data.length,
          questions: q.data.length,
          classes: c.data.length
        });

      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="adminsidebar">

  <h2 className="logo">
  👑 {adminName || "Admin"}
</h2>

      {/* DASHBOARD */}
      <NavLink to="/admin/dashboard" className="side-link">
        🏠 Dashboard
      </NavLink>

      {/* TEACHERS */}
      <div>
        <h4 onClick={() => toggleMenu("teachers")}>
          👨‍🏫 Teachers ({counts.teachers}) ▾
        </h4>

        {openMenu === "teachers" && (
          <div className="submenu">
            <NavLink to="/admin/teachers" className="side-link sub-item">
              📋 View
            </NavLink>
          </div>
        )}
      </div>

      {/* SUBJECTS */}
      <div>
        <h4 onClick={() => toggleMenu("subjects")}>
          📚 Subjects ({counts.subjects}) ▾
        </h4>

        {openMenu === "subjects" && (
          <div className="submenu">
            <NavLink to="/admin/subjects" className="side-link sub-item">
              📋 View
            </NavLink>
          </div>
        )}
      </div>

      {/* QUESTIONS */}
      <div>
        <h4 onClick={() => toggleMenu("questions")}>
          ❓ Questions ({counts.questions}) ▾
        </h4>

        {openMenu === "questions" && (
          <div className="submenu">
            <NavLink to="/admin/questions" className="side-link sub-item">
              📋 View
            </NavLink>
          </div>
        )}
      </div>

      {/* CLASSES */}
      <div>
        <h4 onClick={() => toggleMenu("classes")}>
          🏫 Classes ({counts.classes}) ▾
        </h4>

        {openMenu === "classes" && (
          <div className="submenu">
            <NavLink to="/admin/classes" className="side-link sub-item">
              📋 View
            </NavLink>
          </div>
        )}
      </div>

      {/* REPORTS */}
      <NavLink to="/admin/reports" className="side-link">
        📊 Reports
      </NavLink>

      {/* SETTINGS (BOTTOM) */}
      <div className="sidebar-bottom">

        <h4 onClick={() => setShowSettings(!showSettings)}>
          ⚙ Settings ▾
        </h4>

        {showSettings && (
          <div className="submenu">

            <div
              className="side-link sub-item"
              onClick={() => navigate("/admin/change-password")}
            >
              🔑 Change Password
            </div>

            {/* 🌙 THEME */}
            <div
              className="side-link sub-item"
              onClick={toggleTheme}
            >
              {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
            </div>

            {/* 🚪 LOGOUT */}
            <div
              className="side-link sub-item logout"
              onClick={handleLogout}
            >
              🚪 Logout
            </div>

          </div>
        )}
      </div>

    </div>
  );
}