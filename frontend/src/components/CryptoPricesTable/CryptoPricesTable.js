import React, { useEffect, useState, useRef } from 'react';
import './CryptoPricesTable.css';

function CryptoPricesTable() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const previousPrices = useRef({}); // שמירת המחירים הקודמים

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://cryptosafe.co.il/api/prices'); // URL של השרת
        const data = await response.json();
        
        // שמירה של המחירים הקודמים
        previousPrices.current = { ...prices };

        setPrices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 1000);
    return () => clearInterval(interval);
  }, [prices]); // מחזיק את `prices` ב-dependency list כדי לעדכן את הצבעים

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(prices).map(([key, value], index) => {
            const previousPrice = previousPrices.current[key] || value;
            const priceChangeClass =
              value > previousPrice ? 'price-up' :
              value < previousPrice ? 'price-down' : '';

            return (
              <tr key={index} className={priceChangeClass}>
                <td>{key.replace('Price', '')}</td>
                <td>${parseFloat(value).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoPricesTable;
