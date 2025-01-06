import React from 'react';
import './PricingSection.css'; // קובץ עיצוב מותאם

const PricingSection = () => {
  const pricingData = [
    {
      range: "$0 - $10,000",
      fee: "3.5%",
      icon: "💰", // אייקון מותאם
    },
    {
      range: "$10,000 - $50,000",
      fee: "2.5%",
      icon: "📊", // אייקון מותאם
    },
    {
      range: "$50,000 ומעלה",
      fee: "1.5%",
      icon: "🏦", // אייקון מותאם
    },
  ];

  return (
    <div className="pricing-section">
      <h2 className="pricing-title">תמחור</h2>
      <div className="pricing-cards">
        {pricingData.map((tier, index) => (
          <div className="pricing-card" key={index}>
            <div className="pricing-card-icon">{tier.icon}</div>
            <div className="pricing-card-range">{tier.range}</div>
            <div className="pricing-card-fee">{tier.fee}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
