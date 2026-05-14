import { useEffect, useState } from "react";
import "../../styles/home1.css";
import API_URL from "../../api";
import logo from "../../assets/logo-footer.png";
import paperImg from "../../assets/paper.png";

// HERO IMAGES
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

const heroImages = [banner1, banner2, banner3];

// DUMMY PAPERS
const papers = [
  { name: "Data Structures", img: paperImg },
  { name: "Operating System", img: paperImg },
  { name: "DBMS", img: paperImg },
  { name: "Machine Learning", img: paperImg },
  { name: "AI", img: paperImg }
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  // HERO IMAGE ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* ===== TOPBAR ===== */}
      <div className="topbar">
        <div>📞 +91 98765 43210 | ✉ support@aqpg.com</div>
        <div>Follow Us 🌐</div>
      </div>

      {/* ===== NAVBAR ===== */}
      <div className="navbar">
        <div className="nav-left">
          <img src={logo} alt="logo" />
          <span>AQPG System</span>
        </div>

        <div className="nav-links">
          <a>Home</a>
          <a>Features</a>
          <a>How It Works</a>
          <a>About</a>
        </div>

        <button className="btn">Login</button>
      </div>

      {/* ===== HERO ===== */}
      <div className="hero">
        <div>
          <h1>
            Automated <span>Question Paper</span><br /> Generator System
          </h1>
          <p>Generate exam papers in seconds ⚡</p>
          <button className="btn">Get Started</button>
        </div>

        <img src={heroImages[index]} alt="hero" />
      </div>

      {/* ===== FEATURES ===== */}
      <div className="features">
        <h2>Why Choose AQPG?</h2>

        <div className="grid">
          {["Fast", "Secure", "Error Free", "Customizable", "AI Powered"].map((f, i) => (
            <div key={i}>{f}</div>
          ))}
        </div>
      </div>

      {/* ===== RECENT PAPERS ===== */}
      <div className="recent">
        <h2>Recently Generated Papers</h2>

        <div className="scroll">
          {papers.map((p, i) => (
            <div className="card" key={i}>
              <img src={p.img} alt="" />
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <div className="how">
        <h2>How It Works</h2>

        <div className="steps">
          {["Login", "Select Subject", "Set Params", "Generate", "Download"].map((s, i) => (
            <div key={i} className="step">
              <h4>Step {i + 1}</h4>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <div className="about">
        <h2>About AQPG</h2>
        <p>Smart system to automate question paper generation.</p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="footer">
        <div className="footer-grid">

          <div>
            <h3>AQPG System</h3>
            <p>Automated paper generation system.</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <p>Home</p>
            <p>Features</p>
          </div>

          <div>
            <h3>Services</h3>
            <p>Generate Paper</p>
            <p>Preview</p>
          </div>

          <div>
            <h3>Support</h3>
            <p>Help Center</p>
            <p>Contact</p>
          </div>

          <div>
            <h3>Follow Us</h3>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 AQPG System
        </div>
      </div>

    </div>
  );
}