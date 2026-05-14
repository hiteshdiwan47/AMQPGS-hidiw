import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
 import "../styles/teachersidebar.css";
import { toggleTheme } from "../utils/theme";

export default function TeacherSidebar() {

  const [showSubjects, setShowSubjects] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  // ✅ GET LOGGED IN USER
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      setTeacherName(user.name);
    }

  }, []);

  // 📚 FETCH SUBJECTS
  useEffect(() => {

    axios
      .get("http://localhost:5000/api/subject")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err));

  }, []);

  // 🌙 THEME SYNC
  useEffect(() => {

    const sync = () => {
      setDark(localStorage.getItem("theme") === "dark");
    };

    sync();

    window.addEventListener(
      "theme-change",
      sync
    );

    return () =>
      window.removeEventListener(
        "theme-change",
        sync
      );

  }, []);

  // 🔐 LOGOUT
  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="sidebar">

      {/* ✅ TEACHER NAME */}
      <h2 className="logo">
        👨‍🏫 {teacherName || "Teacher"}
      </h2>

      {/* 🏠 DASHBOARD */}
      <NavLink
        to="/teacher/dashboard"
        className="side-link"
      >
        🏠 Dashboard
      </NavLink>

      {/* 📚 SUBJECTS */}
      <div>

        <h4
          onClick={() =>
            setShowSubjects(!showSubjects)
          }
        >
          📚 Subjects ▾
        </h4>

        {showSubjects && (

          <div className="submenu">

            {subjects.map((sub) => (

              <div
                key={sub._id}
                className="side-link sub-item"
                onClick={() =>
                  navigate(
                    `/teacher/subject/${sub._id}`
                  )
                }
              >
                {sub.name}
              </div>

            ))}

          </div>

        )}

      </div>

      {/* 📊 REPORTS */}
      <NavLink
        to="/teacher/report"
        className="side-link"
      >
        📊 Reports
      </NavLink>

      {/* ⚙ SETTINGS */}
      <div className="sidebar-bottom">

        <h4
          onClick={() =>
            setShowSettings(!showSettings)
          }
        >
          ⚙ Settings ▾
        </h4>

        {showSettings && (

          <div className="submenu">

            {/* 🔑 CHANGE PASSWORD */}
            <div
              className="side-link sub-item"
              onClick={() =>
                navigate(
                  "/teacher/change-password"
                )
              }
            >
              🔑 Change Password
            </div>

            {/* 🌙 THEME */}
            <div
              className="side-link sub-item"
              onClick={toggleTheme}
            >
              {dark
                ? "☀ Light Mode"
                : "🌙 Dark Mode"}
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