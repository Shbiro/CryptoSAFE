import React, { useState } from "react";
import "./LoginUsernameForm.css";

const LoginUsernameForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // ✅ משתנה להצגת הודעות שגיאה/הצלחה

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // מנקה הודעות קודמות

    try {
      const response = await fetch("https://cryptosafe.co.il/api/client-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(" ברוך הבא! " + data.user.firstname);
        console.log("User data:", data.user);

        // ניתן להפנות לדף אחר אחרי התחברות מוצלחת
        // window.location.href = "/dashboard";

      } else {
        setMessage(" שם משתמש או סיסמה שגויים");
      }
    } catch (error) {
      console.error("❌ שגיאה בהתחברות:", error);
      setMessage("❌ שגיאה בשרת. נסה שוב מאוחר יותר.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="LoginTitleuser">היי, טוב לראות אותך</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-group">
          <label className="login-label">שם משתמש:</label>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label className="login-label">סיסמה:</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">התחברות</button>
        <div className="login-links">
          <button className="forgot-password" onClick={() => alert("שכחתי סיסמה נלחץ!")}>שכחתי סיסמה</button>
        </div>
        <div>
          <button className="register" onClick={() => alert("הרשמה נלחץ!")}>הרשמה</button>
        </div>
      </form>

      {/* ✅ הצגת ההודעה מתחת לטופס */}
      {message && <p className="loginformusers-message">{message}</p>}
    </div>
  );
};

export default LoginUsernameForm;
