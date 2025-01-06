import React, { useEffect, useState } from 'react';
import './CryptoPricesTable.css';

function CryptoPricesTable() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('http://16.171.135.218:5000/api/prices'); // URL של השרת
        const data = await response.json();
        setPrices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();

    // עדכון כל 5 שניות
    const interval = setInterval(fetchPrices, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-prices-table">
      <h2>Live Crypto Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(prices).map(([key, value], index) => (
            <tr key={index}>
              <td>{key.replace('Price', '')}</td>
              <td>${parseFloat(value).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoPricesTable;
