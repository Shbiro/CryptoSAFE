const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const router = express.Router();

// 🔹 נתיב לקובץ ה-CSV
const CSV_FILE_PATH = path.join(__dirname, '../Python/LivePrice.csv');

// פונקציה לקרוא את הקובץ CSV ולפרסר את הנתונים
const readCsvFile = async () => {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                if (results.length > 0) {
                    resolve(results[0]); // מחזיר רק את השורה הראשונה (הנתונים העדכניים ביותר)
                } else {
                    reject("No data found in CSV");
                }
            })
            .on('error', (error) => reject(error));
    });
};

// API להחזרת הנתונים מקובץ CSV
router.get('/api/prices', async (req, res) => {
    try {
        const prices = await readCsvFile();
        res.json(prices);
    } catch (error) {
        console.error('❌ Error fetching data from CSV:', error);
        res.status(500).json({ error: 'Failed to fetch data from CSV' });
    }
});

module.exports = router;
