import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/register.css";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role: "teacher"
      });

      alert("Registered Successfully!");
      navigate("/");

    } catch (err) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <h2>Create Account</h2>
        <p className="subtitle">Teacher Registration</p>

        <input
          type="text"
          placeholder="Enter Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </div>

    </div>
  );
}