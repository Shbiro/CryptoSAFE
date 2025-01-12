import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://cryptosafe.co.il/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAnimationTriggered(true);
        setTimeout(() => {
          setAnimationTriggered(false);
          setShowSuccessMessage(true);
        }, 3000);
      } else {
        console.error('Error submitting the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (animationTriggered) {
    return <CryptoAnimation />;
  }

  if (showSuccessMessage) {
    return <SuccessMessage />;
  }

  return (
    <div className="contact-form-container">
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <h2>השאר פרטים ונחזור אליך</h2>
          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            aria-label="שם מלא"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="אימייל"
            aria-label="אימייל"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="טלפון"
            aria-label="טלפון"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            id="message-input"
            name="message"
            placeholder="הודעה (לא חובה)"
            aria-label="הודעה (לא חובה)"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button id="submit-button-contactformhomepage" type="submit" className="send-button">
            שלח
          </button>
        </form>
      </div>
    </div>
  );
};

const CryptoAnimation = () => (
  <div className="crypto-animation">
    {Array.from({ length: 15 }).map((_, index) => (
      <div
        key={index}
        className="coin"
        style={{
          backgroundImage: `url(${[
            'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
            'https://cryptologos.cc/logos/ethereum-eth-logo.png',
            'https://cryptologos.cc/logos/xrp-xrp-logo.png',
            'https://cryptologos.cc/logos/cardano-ada-logo.png',
            'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
            'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png',
          ][index % 6]})`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      ></div>
    ))}
  </div>
);

const SuccessMessage = () => (
  <div className="success-message-contactform-homepage">
    <h2>!הטופס נשלח בהצלחה</h2>
    <p>.נציג יחזור אליך בהקדם</p>
  </div>
);

export default ContactForm;
