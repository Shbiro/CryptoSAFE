import React from 'react';
import './CryptoSection2.css'; // קובץ עיצוב מותאם

const CryptoSection2 = () => {
  const servicesData = [
    {
      title: "שמירת קריפטו מאובטחת",
      description: "אנו מציעים שירותי שמירה בדרגת בנק למטבעות דיגיטליים שלך.",
      icon: "🔒", // ניתן לשנות לאייקון מותאם
    },
    {
      title: "ניהול נאמנות מבוזרת",
      description: "פתרונות נאמנות מבוזרת המותאמים לצרכים שלך.",
      icon: "🌐",
    },
    {
      title: "תמיכה מסביב לשעון",
      description: "שירות לקוחות זמין 24/6 כדי שתמיד תרגיש בטוח.",
      icon: "📞",
    },
    {
      title: "עסקאות פרטיות מיד ליד",
      description: "אנו מאפשרים תיווך ושמירה בעסקאות פרטיות בצורה מאובטחת ואמינה.",
      icon: "🤝",
    },
    {
      title: "רכישות קריפטו מאובטחות",
      description: "תמיכה ברכישת נכסים גדולים כמו רכבים ונדל\"ן באמצעות קריפטו.",
      icon: "🏠",
    },
    {
      title: "בדיקת שטרות מזויפים",
      description: "שירות מתקדם לזיהוי שטרות מזויפים כדי להבטיח עסקאות בטוחות ואמינות.",
      icon: "💵",
    }
  ];

  return (
    <div className="crypto-section">
      <h2 className="crypto-section-title">שירותי החברה</h2>
      <div className="crypto-section-container">
        {servicesData.map((service, index) => (
          <div className="crypto-service-card" key={index}>
            <div className="crypto-service-icon">{service.icon}</div>
            <h3 className="crypto-service-title">{service.title}</h3>
            <p className="crypto-service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoSection2;
