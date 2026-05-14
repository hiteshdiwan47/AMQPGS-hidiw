import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function SubjectCard({ name, subjectCode, _id }){
  const navigate = useNavigate();

  // 🌙 FIX: proper theme type (string based, not boolean)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

//const [theme, setTheme] = useState(getTheme());

useEffect(() => {
  const sync = () => setTheme(getTheme());

  window.addEventListener("theme-change", sync);
  return () => window.removeEventListener("theme-change", sync);
}, []);
{/*
  return (
    <motion.div
      className={`subject-card ${theme === "dark" ? "dark" : ""}`}
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/teacher/subject/${_id}`)}
    >
      <h4>{s.name}</h4>
      <p>{s.subjectCode}</p>
      <button>Generate →</button>
}</motion.div>
  );
}
*/}

//import { useEffect, useState } from "react";
//import { getTheme } from "../utils/theme";

 return (
    <div className="subject-card"
        onClick={() => navigate(`/teacher/subject/${_id}`)}>
      <h4>{name}</h4>
     
      <button className="generate-btn">
        Generate
      </button>
    </div>
    
  );
}