import React from 'react';
import './WhatsAppButton.css';

function WhatsAppButton() {
  const openWhatsApp = () => {
    const phoneNumber = "+972502268395"; // מספר הטלפון שלך בפורמט בינלאומי
    const message = "שלום, הגעתי דרך האתר CryptoSafe"; // הודעה שתשלח כברירת מחדל
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={openWhatsApp}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </div>
  );
}

export default WhatsAppButton;
