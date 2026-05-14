import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home1.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub, faWhatsapp, faXTwitter ,  // faUsers,
  //faFileLines,
  //faBuilding,
  //faBullseye 
  } from "@fortawesome/free-brands-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faLayerGroup,
  faSliders,
  faWandMagicSparkles,
  //faFileLines,
  faDownload,
 
} from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFileLines,
  faBuilding,
  faBullseye
} from "@fortawesome/free-solid-svg-icons";


import {
  faPhone,
  faEnvelope,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faInstagram,
  //faLinkedinIn,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";


// ✅ IMAGE IMPORTS
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.png";
import banner5 from "../../assets/banner5.png";
import banner6 from "../../assets/banner6.png";
import banner7 from "../../assets/banner7.png";
import banner8 from "../../assets/banner8.png";
import banner9 from "../../assets/banner9.png";
import banner10 from "../../assets/banner10.png";
import banner11 from "../../assets/banner11.png";

import logo from "../../assets/logo-footer.png";
import paper from "../../assets/paper.png";
import logospu from "../../assets/logoSPU.png";
// IMAGE IMPORTS
import student from "../../assets/student.png";
import student1 from "../../assets/student1.png";
import student2 from "../../assets/student2.png";
import student3 from "../../assets/student3.png";
import student4 from "../../assets/student4.png";
// IMAGE IMPORTS

import paper1 from "../../assets/paper1.png";
import paper2 from "../../assets/paper2.png";
import paper3 from "../../assets/paper3.png";
import paper4 from "../../assets/paper4.png";
import paper5 from "../../assets/paper5.png";
import paper6 from "../../assets/paper6.png";


// ✅ FIX 1: HowItWorks component OUTSIDE
function HowItWorks({ steps }) {
  return (
    <div className="how-section" id="how">
      <h2>How It Works</h2>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-wrapper" key={index}>
            
            <div className="step-card">
              <div className="icon">
                <FontAwesomeIcon icon={step.icon} />
              </div>
              <h4>{step.title}</h4>
              <h3>{step.heading}</h3>
              <p>{step.desc}</p>
            </div>

            {index !== steps.length - 1 && (
              <div className="arrow">➜</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default function HomePage() {


  const steps = [
    {
      icon: faRightToBracket,
      title: "Step 1",
      heading: "Login / Register",
      desc: "Create your account and login to access the system."
    },
    {
      icon: faLayerGroup,
      title: "Step 2",
      heading: "Select Subject",
      desc: "Choose subject, course, year and exam details."
    },
    {
      icon: faSliders,
      title: "Step 3",
      heading: "Set Parameters",
      desc: "Set marks, difficulty level, question types and topics."
    },
    {
      icon: faWandMagicSparkles,
      title: "Step 4",
      heading: "Generate Paper",
      desc: "Click on generate and let our system do the magic."
    },
    {
      icon: faFileLines,
      title: "Step 5",
      heading: "Preview Paper",
      desc: "Preview the generated paper before downloading."
    },
    {
      icon: faDownload,
      title: "Step 6",
      heading: "Download / Print",
      desc: "Download or print the question paper instantly."
    }
  ];


const paperimages = [
  { img: paper1, subject: "Data Structures" },
  { img: paper2, subject: "Soft Computing" },
  { img: paper3, subject: "Data Analytics" },
  { img: paper4, subject: "Java Programming" },
  { img: paper5, subject: "Cloud Computing" },
  { img: paper6, subject: "Machine Learing" }
];

//const [activeIndex, setActiveIndex] = useState(0);

const [paperIndex, setPaperIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setPaperIndex(prev => (prev + 1) % paperimages.length);
  }, 2000); // 2 sec change

  return () => clearInterval(interval);
}, []);


  const studentimages = [student, student1, student2, student3, student4];

const [studentIndex, setStudentIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setStudentIndex(prev => (prev + 1) % studentimages.length);
  }, 2000); // 2 sec change

  return () => clearInterval(interval);
}, []);

  const bannerimages = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9, banner10, banner11];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerimages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="homepage">

    {/* TOP BAR */}
    <div className="top-bar">
      <div>📞 +91 9340476616 | ✉ info@spuinfo.com</div>
      <div>📍 Balaghat, Madhya Pradesh</div>

      <div>
        Follow Us 🌐
        <FontAwesomeIcon icon={faLinkedinIn} />
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faWhatsapp} />
        <FontAwesomeIcon icon={faXTwitter} />
      </div>

    </div>
  

    

    {/* NAVBAR */}
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" />
      {/*
        <img src={logospu} alt="logoSPU" />
        <img src={paper} alt="paper" />
        */}
      </div>

      <div className="nav-center">
        📚Automated Question Paper Generator System📚
      </div>
       
 <div className="blink">Efficient & Reliable!</div>

    </div>

    {/* MENU */}
    <div className="menu">
      <a href="#">Home</a>
      
      <Link to="/login">Login</Link>
      <a href="#features">Features</a>
      <a href="#recent">Pricing</a>
      <a href="#how">How It Works</a>
      <a href="#students">Students Gallery</a>
      <a href="#about">About</a>
      <a href="#footer">Contact</a>
            <div className="blink">AI Powered</div>
    
    </div>

    {/* HERO */}
    <div className="hero">
      <div className="hero-left">
        <b>AI Powered | Time Saving | Error Free</b>
        <h1>Generate Exam Papers in Seconds!</h1>
        <p>Generate accurate, cutomized and exam-ready question papers in just a few clicks, Save time and focus on what matters.</p>
        <p>Fast, Easy & Automated!</p>

        <button
          className="hero-btn"
          onClick={() => window.location.href = "/login"}
        >
          Get Started ➡️
        </button>

            <button
          className="hero-btn"
          onClick={() => window.location.href = "//login"}
        >
        Explore Site
        </button>
      </div>

      <div className="hero-right">
        <div className="image-wrap">
        <img src={bannerimages[index]} alt="hero" />
        </div>
      </div>
    </div>

    {/* FEATURES */}
    <div className="features" id="features">
        <h2>Why Choose AQPG System ?</h2>
      <div className="feature"><h1>📄 Quick Paper Creation</h1>
      <p>Generate question papers instantly with smart randomization.</p></div>
      <div className="feature"><h1>🛡️ Error Free</h1>
      <p>Eliminate human errors and ensure accuracy in every paper.</p></div>
      <div className="feature"><h1>🛡 Secure & Accurate</h1><p>Your data and question bank are always 100% secure.</p></div>
      <div className="feature"><h1>⏱ Time Saving Solution</h1><p>Save hours of mutual work in just a few clicks.</p></div>
      <div className="feature"><h1>📂Customizable </h1><p>Customize difficulty level marks, topics and question types.</p></div>
    </div>

    {/* RECENT */}
    <div className="recent" id="recent">
  <h2>Recently Generated Papers</h2>

  <div className="paper-scroll">
  {[...paperimages, ...paperimages].map((item, i) => (
    <div className="paper-card" key={i}>
      <span className="paper-label">{item.subject}</span>
      <img src={item.img} alt="paper" />
      <p>{item.subject}</p>
    </div>
  ))}
</div>
</div>

  


      {/* ✅ FIXED HOW IT WORKS */}
      <div className="how-section">
      <HowItWorks steps={steps} />
</div>
    {/* student gallery */}
    <div className="student-section">
    <div id="students" className="students">
      <h2>Students Gallery</h2>
     {/* <p>
        Our platform simplifies exam paper creation for schools and colleges,
        ensuring accuracy and efficiency.
      </p>
  */}

    {/* ABOUT GALLERY (FIXED HERE) */}
    <div className="students-gallery">
      {studentimages.map((img, index) => (
        <div
          className={`flip-card ${studentIndex === index ? "active" : ""}`}
          key={index}
        >
          <div className="flip-inner">
            <div className="flip-front">
              <img src={img} alt="student" />
            </div>

            <div className="flip-back">
              <img src={img} alt="student-back" />
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
      </div>
{/* About */ }
 <div className="about-section" id="about">

      {/* LEFT CONTENT */}
      <div className="about-left">
        <h2>About AQPG System</h2>
        <p>
          AQPG System is an advanced solution designed for educators and 
          institutions to automate the process of creating question papers.
          Our system ensures quality, randomness and security while saving 
          valuable time.
        </p>

        <div className="about-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="about"
          />
        </div>
      </div>

      {/* RIGHT STATS */}
      <div className="about-right">

        <div className="stat-card">
          <FontAwesomeIcon icon={faUsers} />
          <h3>10K+</h3>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <FontAwesomeIcon icon={faFileLines} />
          <h3>25K+</h3>
          <p>Papers Generated</p>
        </div>

        <div className="stat-card">
          <FontAwesomeIcon icon={faBuilding} />
          <h3>100+</h3>
          <p>Institutions</p>
        </div>

        <div className="stat-card">
          <FontAwesomeIcon icon={faBullseye} />
          <h3>99.9%</h3>
          <p>Accuracy Rate</p>
        </div>

      </div>
    </div>
  

    {/* FOOTER */}
    <div className="footer" id ="footer">
      <div className="footer-grid">

        {/* LOGO + ABOUT */}
        <div className="footer-col">
          <h2>AQPG System</h2>
          <p>Smart. Secure. Automated.</p>
          <p>
            Empowering educators with technology to create quality question
            papers in seconds.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Features</li>
            <li>How It Works</li>
            <li>Pricing</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-col">
          <h3>Our Services</h3>
          <ul>
            <li>Question Paper Generation</li>
            <li>Question Bank Management</li>
            <li>Exam Management</li>
            <li>Reports & Analytics</li>
            <li>User Management</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p><FontAwesomeIcon icon={faPhone} /> +91 9340476616</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> support@hidiwaqpgsystem.com</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> Balaghat, Madhya Pradesh</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <p><FontAwesomeIcon icon={faFacebookF} /> Facebook</p>
          <p><FontAwesomeIcon icon={faInstagram} /> Instagram</p>
          <p><FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn</p>
          <p><FontAwesomeIcon icon={faTwitter} /> Twitter</p>
        </div>

  

   
      {/* NEWSLETTER */}
<div className="newsletter">
  <h3>Subscribe to Newsletter</h3>
  <p>Get latest updates & papers directly in your inbox</p>

  <div className="newsletter-box">
    <input type="email" placeholder="Enter your email..." />
    <button>Subscribe</button>
  </div>
</div>
</div>

      <div className="footer-bottom">
        <p>© 2026 Automated Question Paper Generator System</p>
        <span>Developed and Managed by Hitesh Diwan</span>
      </div>
    </div>
  
    </div>
 
);

}