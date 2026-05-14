import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../styles/ResetPassword.css";

export default function ResetPassword() {

  const { email } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
 if (!password || !confirmPassword) {
      alert("Please enter your password");
      return;
    }

    // Match Password Check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try{
const res = await axios.post(
      "http://localhost:5000/api/auth/reset-password",
      {
        email,
        password
      }
    );

    alert(res.data.message);
      setPassword("");
  setConfirmPassword("");


window.location.href = "/login";

  } catch (error){
    alert("Somthing went wong")
  }

  };



  return (

    <div className="reset-container">

      <h2>Reset Password</h2>

      <input
        type="password"
        value={password}
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />
<input
        type="password"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleReset}>
        Update Password
      </button>

    </div>
  );
}