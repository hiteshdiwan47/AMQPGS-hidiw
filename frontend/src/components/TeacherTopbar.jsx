import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun, Bell, User } from "lucide-react";
import "../styles/teachertopbar.css";
import { toggleTheme } from "../utils/theme";
import logo from "../assets/logo-footer.png";

export default function TeacherTopbar() {

  const navigate = useNavigate();

  const [dark, setDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
  setShowDropdown(prev => !prev);
};

// close on outside click
useEffect(() => {
  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

  // 🔥 THEME SYNC FIX
  useEffect(() => {
    const sync = () => {
      setDark(localStorage.getItem("theme") === "dark");
    };

    sync();
    window.addEventListener("theme-change", sync);

    return () => window.removeEventListener("theme-change", sync);
  }, []);

  // 🔐 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="teacher-top-bar">

      {/* LEFT EMPTY */}
       {/* 🔵 LEFT */}
            <div className="top-left">
           <img src={logo} alt="logo" />
            </div>

      {/* CENTER TITLE */}
      <h2 className="project-title">
          📚Automated Question Paper Generator📚
      </h2>

      {/* RIGHT SIDE */}
      <div className="top-right">

        {/* 🔔 NOTIFICATION */}
        <div className="icon-btn">
          <Bell size={20} />
          <span className="badge">2</span>
        </div>

        {/* 🌙 DARK MODE */}
        <div className="icon-btn" onClick={toggleTheme}>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </div>

       {/* 👤 PROFILE */}


  <div className="profile" onClick={(e) => e.stopPropagation()}>
  

  <h4 className="profile-title" onClick={toggleDropdown}>
    👤 Profile <User size={15} />
  </h4>

  {/* DROPDOWN */}
  {showDropdown && (
    <div className="dropdown">

      <div
        className="dropdown-item"
        onClick={() => navigate("/teacher/change-password")}
      >
        🔑 Change Password
      </div>

      <div
        className="dropdown-item"
        onClick={toggleTheme}
      >
        {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
      </div>

      <div
        className="dropdown-item logout"
        onClick={handleLogout}
      >
        🚪 Logout
      </div>

    </div>
  )}

</div>
       

        </div>

      </div>


  );
}