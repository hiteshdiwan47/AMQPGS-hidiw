import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Moon, Sun, User } from "lucide-react";
import "../styles/admintopbar.css";

import logo from "../assets/logo-footer.png";
export default function AdminTopbar() {

  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [dark, setDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🌙 THEME TOGGLE
  const toggleTheme = () => {
    const newTheme = dark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
    setDark(!dark);
  };

  // 🔄 SYNC THEME
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.body.className = theme;
    setDark(theme === "dark");
  }, []);


  
  // ❌ CLOSE DROPDOWN (CLICK OUTSIDE)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-top-bar">

      {/* 🔵 LEFT */}
      <div className="top-left">
     <img src={logo} alt="logo" />
      </div>

      {/* 🟡 CENTER */}
      <h2 className="project-title">
       📚Automated Question Paper Generator📚
      </h2>
      {/* 🔴 RIGHT */}
      <div className="top-right">

        {/* 🌙 THEME */}
        <div className="icon-btn" onClick={toggleTheme}>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </div>

        {/* 👤 PROFILE */}
        <div className="profile" ref={dropdownRef}>

          <div
            className="profile-box"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <User size={18} />
            <span>Admin</span>
          </div>

          {showDropdown && (
            <div className="dropdown">

              <div
                className="dropdown-item"
                onClick={() => navigate("/admin/profile")}
              >
                👤 Profile
              </div>

              <div
                className="dropdown-item"
                onClick={() => navigate("/admin/change-password")}
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