import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [animationTriggered, setAnimationTriggered] = useState(false); // מצב עבור האנימציה
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // מצב להודעה

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('שולח נתונים...');

    try {
      const response = await fetch('http://16.171.135.218:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAnimationTriggered(true); // מפעיל את האנימציה
        setTimeout(() => {
          setAnimationTriggered(false); // מפסיק את האנימציה
          setShowSuccessMessage(true); // מציג הודעת הצלחה
        }, 3000); // זמן סיום האנימציה
        setStatus('הנתונים נשלחו בהצלחה!');
      } else {
        setStatus('שגיאה בשליחת הנתונים.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('שגיאה בשליחת הנתונים.');
    }
  };

  return (
    <div className="contact-form">
      {!animationTriggered && !showSuccessMessage && (
        <>
          <h2>השאר פרטים ונחזור אליך</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="שם מלא"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="אימייל"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="טלפון"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="הודעה (לא חובה)"
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit" className="send-button">שלח</button>
          </form>
        </>
      )}

{animationTriggered && (
  <div className="crypto-animation">
    {Array.from({ length: 15 }).map((_, index) => (
      <div
        key={index}
        className="coin"
        style={{
          backgroundImage: `url(${[
            "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
            "https://cryptologos.cc/logos/ethereum-eth-logo.png",
            "https://cryptologos.cc/logos/xrp-xrp-logo.png",
            "https://cryptologos.cc/logos/cardano-ada-logo.png",
            "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
            "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png",
          ][index % 6]})`,
          left: `${Math.random() * 100}%`, // מיקום אופקי רנדומלי
          animationDelay: `${Math.random() * 2}s`, // עיכוב רנדומלי לאנימציה
        }}
      ></div>
    ))}
  </div>
)}





      {showSuccessMessage && (
        <div className="success-message">
          <h2>!הטופס נשלח בהצלחה</h2>
          <p>.נציג יחזור אליך בהקדם</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
