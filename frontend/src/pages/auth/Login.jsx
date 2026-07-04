import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import API_URL from "../../api";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password
        }
      );

      // ✅ SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "token",
        res.data.token
      );


      localStorage.setItem(
        "role",
        res.data.user.role
      );

      // ✅ ROLE BASED REDIRECT
      if (res.data.user.role === "admin") {

        navigate("/admin/dashboard");

      } else if (res.data.user.role === "teacher") {

        navigate("/teacher/dashboard");

      } else {

        alert("Invalid role");

      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login Failed ❌"
      );

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          className="forgot-link"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <button onClick={handleLogin}>
          Login
        </button>

        <p
          className="register-link"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </p>

      </div>

    </div>
  );
}