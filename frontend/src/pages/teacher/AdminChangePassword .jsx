import { useState } from "react";
import "../../styles/changepassword.css";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleChange = () => {
    if (!oldPass || !newPass) {
      alert("Fill all fields");
      return;
    }

    console.log(oldPass, newPass);

    alert("Password Updated Successfully ✅");

    setOldPass("");
    setNewPass("");
  };

  return (
    <div className="change-password-container">

      <h2>🔒 Change Password</h2>

      <input
        type="password"
        placeholder="Enter Old Password"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />

      <button onClick={handleChange}>
        Update Password
      </button>

    </div>
  );
}