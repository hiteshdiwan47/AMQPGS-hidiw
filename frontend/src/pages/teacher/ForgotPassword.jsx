import { useState } from "react";
import axios from "axios";
import "../../styles/ForgotPassword.css";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
const res= await axios.post(
  "${API_URL}/api/auth/forgot-password",
  { email }
);

      alert(res.data.message);

    } catch (error) {

      alert("Email not found");

    }

  };

  return (

    <div className="forgot-container">

      <form onSubmit={handleSubmit}>

        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          Send Reset Link
        </button>

      </form>

    </div>

  );
}