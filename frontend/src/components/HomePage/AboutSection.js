import React from 'react';
import './AboutSection.css'; // ניצור קובץ CSS לעיצוב
import { useNavigate } from "react-router-dom";
const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <div className="about-section">
      <h2 className="about-title">אודות החברה</h2>
      <p className="about-text">
        חברת <strong>קריפטוסייפ</strong> נוסדה כדי להוביל שינוי בעולם הקריפטו. 
        אנו מחויבים להעניק ללקוחותינו את הביטחון והשקיפות שהם צריכים עבור עסקאות קריפטו.
        החברה מתמחה בשירותי נאמנות, פתרונות מאובטחים לעסקאות פרטיות, ותמיכה מלאה 
        בתהליך ניהול עסקאות קריפטו
      </p>
      <p className="about-text">
        עם צוות מומחים בעלי ניסיון רב ולקוחות מרוצים, אנו מבטיחים חוויית משתמש 
        יוצאת דופן ומבטיחים שעסקאות הקריפטו שלכם יהיו בטוחות ופשוטות.
      </p>
      <button
      className="aboutbutton" 
            onClick={() => navigate("/about")}
        >
            אודות
        </button>
    </div>
  );
};

export default AboutSection;
