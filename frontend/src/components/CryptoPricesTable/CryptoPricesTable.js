import React, { useEffect, useState, useRef } from 'react';
import './CryptoPricesTable.css';

function CryptoPricesTable() {
  const [prices, setPrices] = useState({});
  const [highlightedRows, setHighlightedRows] = useState({}); // שורות מודגשות
  const previousPrices = useRef({}); // שמירת המחירים הקודמים
  const timeoutRefs = useRef({}); // שמירת הזמן של ההדגשות

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://cryptosafe.co.il/api/prices');
        const data = await response.json();
  
        const updatedHighlights = { ...highlightedRows };
  
        Object.keys(data).forEach((key) => {
          const previousPrice = previousPrices.current[key] || data[key];
  
          if (data[key] > previousPrice) {
            updatedHighlights[key] = 'price-up';
          } else if (data[key] < previousPrice) {
            updatedHighlights[key] = 'price-down';
          }
  
          // ביטול טיימר קודם אם קיים כדי למנוע מחיקה מוקדמת
          if (timeoutRefs.current[key]) {
            clearTimeout(timeoutRefs.current[key]);
          }
  
          // הסרת הצבע אחרי 2.5 שניות
          timeoutRefs.current[key] = setTimeout(() => {
            setHighlightedRows((prev) => {
              const newHighlights = { ...prev };
              delete newHighlights[key];
              return newHighlights;
            });
          }, 2500);
        });
  
        // שמירת המחירים הקודמים
        previousPrices.current = { ...data };
        setPrices(data);
        setHighlightedRows(updatedHighlights);
  
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };
  
    fetchPrices();
    const interval = setInterval(fetchPrices, 1000);
    return () => clearInterval(interval);
  }, [highlightedRows]); // ✅ הוספת highlightedRows למערך התלויות
  

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
          {Object.entries(prices).map(([key, value], index) => (
            <tr key={index} className={highlightedRows[key] || ''}>
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
