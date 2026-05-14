import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home1.css";

//import TeacherLayout from "../../components/TeacherLayout"; // ✅ MUST BE HERE

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.png";
import banner5 from "../../assets/banner5.png";
import banner6 from "../../assets/banner6.png";
import banner7 from "../../assets/banner7.png";
import logo from "../../assets/logo-footer.png";

const images = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(null); // ✅ FIX
  const navigate = useNavigate();

  // ✅ Slider auto
  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  // ✅ Toggle (same like settings dropdown)
  const toggleMenu = (name) => {
    setMenu(menu === name ? null : name);
  };

return (

    
      <div>

        {/* TOP BAR */}
        <div className="first">
          <div>
            📞 +91-9174202111 | ✉️ info@spu.ac.in
          </div>

          <div className="intraction">👈👉</div>

          <div className="blink">Admission Open</div>
        </div>

      {/* TOP NAV */}
      <div className="topnav">

        <div className="nav-box">
          <h4 onClick={() => toggleMenu("media")}>Media ▾</h4>

          {menu === "media" && (
            <div className="dropdown">
              <div>Print Media</div>
              <div>Image Gallery</div>
            </div>
          )}
        </div>

        <Link to="/login">ERP</Link>
        <span>Email</span>
        <span>Events</span>
        <span>Notices</span>
        <span>Contact</span>
        <span>Screen Reader</span>
        <span>E-Learning</span>
      </div>

      {/* LOGO */}
      <div className="logo">
        <img src={logo} alt="logo" />

        <div className="logo-text">
          <b>📚Automated Question Paper Generator System📚</b>
        </div>

        <div className="logo-icons">
          <a href="https://wa.me/919174202111" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="whatsapp" />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="youtube" />
          </a>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar">

        <div className="nav-box">
          <Link to="/">Home</Link>
        </div>

        <div className="nav-box">
          <h4 onClick={() => toggleMenu("about")}>About SPU ▾</h4>
          {menu === "about" && (
            <div className="dropdown">
              <div>About</div>
              <div>Vision</div>
              <div>Mission</div>
            </div>
          )}
        </div>

        <div className="nav-box">
          <h4 onClick={() => toggleMenu("schools")}>Schools ▾</h4>
          {menu === "schools" && (
            <div className="dropdown">
              <div>Engineering</div>
              <div>Management</div>
              <div>Agriculture</div>
            </div>
          )}
        </div>

        <div className="nav-box">
          <h4 onClick={() => toggleMenu("admission")}>Admission ▾</h4>
          {menu === "admission" && (
            <div className="dropdown">
              <div>Admission Notice</div>
              <div>Application Form</div>
            </div>
          )}
        </div>

        <div className="nav-box">
          <h4 onClick={() => toggleMenu("students")}>Students ▾</h4>
          {menu === "students" && (
            <div className="dropdown">
              <Link to="/login">Student Login</Link>
              <div>Campus Connect</div>
            </div>
          )}
        </div>

        <div className="nav-box">
          <h4 onClick={() => toggleMenu("exam")}>Examination ▾</h4>
          {menu === "exam" && (
            <div className="dropdown">
              <div>Entrance Exam</div>
              <div>Schedule</div>
              <div>Result</div>
            </div>
          )}
        </div>

        <div className="nav-box">
          <h4 onClick={() => toggleMenu("research")}>Research ▾</h4>
          {menu === "research" && (
            <div className="dropdown">
              <div>Collaboration</div>
              <div>E-Resource</div>
            </div>
          )}
        </div>

      </div>

      {/* SLIDER */}
      <div className="slider">
        <button className="prev" onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}>❮</button>
        <img src={images[index]} alt="slide" />
        <button className="next" onClick={() => setIndex((index + 1) % images.length)}>❯</button>
      </div>

      {/* FOOTER */}
      <div className="footer">

        <div className="footer-container">

          <div className="footer-col">
  <h3>About SPU</h3>
<p>
  Sardar Patel University (SPU) stands as a center of excellence in higher education, 
  offering diverse programs in engineering, management, and applied sciences. 
  The university emphasizes innovation, research, and holistic development, ensuring 
  students gain both theoretical knowledge and practical skills. Through advanced 
  learning resources, industry collaboration, and a strong academic environment, 
  SPU nurtures future-ready professionals and responsible citizens.
</p>
</div>

<div className="footer-col">
  <h3>Vision</h3>
<p>
  To be a leading center of excellence in education, research, and innovation, 
  empowering students with knowledge, skills, and values to contribute 
  effectively to society and global development.
</p>
</div>

<div className="footer-col">
  <h3>Mission</h3>
<p>
  To provide quality education through modern teaching methodologies and 
  advanced infrastructure. To promote research, innovation, and industry 
  collaboration while fostering ethical values, leadership, and lifelong 
  learning among students.
</p>
</div>

          <div className="footer-col">
            <h3>Streams</h3>
            <p>Engineering</p>
            <p>Management</p>
            <p>Agriculture</p>
          </div>

          <div className="footer-col">
            <h3>Resources</h3>
            <p>Academic Calendar</p>
            <Link to="/login">ERP Login</Link>
            <p>Results</p>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <p>📞 +91-9174202111</p>
            <p>✉️ info@spu.ac.in</p>
    

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3704.2281294625786!2d80.1140382!3d21.81011489999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a5944a7f7e325%3A0x45913926b29f868c!2sSardar%20Patel%20University%20Balaghat!5e0!3m2!1sen!2sin!4v1775924488878!5m2!1sen!2sin" 
            width="400" height="200" style={{border:0}} allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="map" title="map">
            </iframe>
          </div>
          <div className="footer-col">
  <h3>Newsletter</h3>
  <p>Subscribe to get latest updates</p>

  <div className="newsletter">
    <input type="email" placeholder="Enter your email" />
    <button>Subscribe</button>
  </div>
</div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 SPU University</p>

          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="github" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedin" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="instagram" />
            </a>
          </div>
        </div>

        <div className="developer">
          Developed by <strong>Hitesh Diwan</strong>
        </div>

      </div>

     </div>
 // </TeacherLayout>
);
}