import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-middle">
        <div className="footer-section">
          <h3>מידע חשוב</h3>
          <Link to="/blogs/whatisbitcoin">מה זה ביטקוין?</Link>
          <Link to="/blogs/ethcontarcts">חוזים חכמים באת'ריום</Link>
          <Link to="/blogs/howkeepsafeyourmoney">איך לשמור על הכסף שלך?</Link>
          <Link to="/blogs/howbitcoinwork">איך ביטקוין עובד?</Link>
          <Link to="/blogs/howtochoosewallet">איך לבחור ארנק?</Link>
          <Link to="/blogs/amibeingscammed">האם אני נעקץ?</Link>
        </div>
        <div className="footer-section">
          <h3>קישורים שימושיים</h3>
          <Link to="/">דף הבית</Link>
          <Link to="/blogs">בלוגים</Link>
          <Link to="/bo">ניהול תוכן</Link>
          <Link to="/bo/tasks">משימות</Link>
          <Link to="/contact">צור קשר</Link>
        </div>
        <div className="footer-section">
          <h3>עקבו אחרינו</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">פייסבוק</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">טוויטר</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">אינסטגרם</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">לינקדאין</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CryptoSAFE</p>
      </div>
    </footer>
  );
};

export default Footer;
