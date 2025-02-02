import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // ✅ ייבוא Link עבור ניווט פנימי
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
      <Link to="/" className="logo-link">CryptoSAFE</Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <nav className={`nav ${menuOpen ? 'menu-open' : ''}`} ref={navRef}>
        <ul>
          <li><Link to="/">ראשי</Link></li>
          <li className="dropdown">
            <a href="#services">שירותים</a>
            <ul className="dropdown-menu">
              <li><a href="#escrow">שירותי נאמנות</a></li>
              <li><a href="#payments">תשלומים בקריפטו</a></li>
              <li><a href="#holding">שמירת כספים</a></li>
            </ul>
          </li>
          <li><a href="#how-it-works">איך זה עובד</a></li>
          <li><a href="#pricing">תמחור</a></li>
          <li><a href="#about">אודות</a></li>
          <li><a href="#contact">יצירת קשר</a></li>

          {/* ✅ הוספת קישור לעמוד הבלוגים */}
          <li><Link to="/blogs">בלוגים</Link></li>

          <div className="logomobilemenu">
            <h1>CryptoSafe</h1>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
