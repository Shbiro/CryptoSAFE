import React from 'react';
import './CryptoSection1.css';
import BitcoinImage from './Bitcoin1.png'; // ייבוא התמונה

function CryptoSection() {
  return (
    <section className="crypto-section">
      {/* כותרת */}
      <div className="crypto-header">
        <h1>CryptoSAFE - חברת נאמנות</h1>
        <p>
          .הפלטפורמה המובילה לביטחון ונאמנות בעסקאות קריפטו. אנו מבטחים את
          בטיחות שני הצדדים בעסקאות פרטיות
        </p>
      </div>

      {/* פריסה של טבלה, ביטקוין גדול, ומידע נוסף */}
      <div className="crypto-layout">
        {/* טבלת מחירים */}
                {/* ביטקוין גדול */}
                <div className="bitcoin-center">
          <img
            src={BitcoinImage}
            alt="Bitcoin"
            className="large-bitcoin"
          />
        </div>
      </div>
    </section>
  );
}

export default CryptoSection;
