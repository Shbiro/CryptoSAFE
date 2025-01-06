require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // ייבוא path
const Airtable = require('airtable');

// Airtable credentials
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ** Serve React frontend as static files **
const buildPath = path.join(__dirname, 'build'); // מיקום ה-build של React
app.use(express.static(buildPath));

// API to fetch crypto prices from Airtable
app.get('/api/prices', async (req, res) => {
  try {
    const records = await base(AIRTABLE_TABLE_NAME).select().firstPage();
    const prices = records.map((record) => ({
      BitcoinPrice: record.fields.BitcoinPrice || "N/A",
      XrpPrice: record.fields.XrpPrice || "N/A",
      EthPrice: record.fields.EthPrice || "N/A",
      DogePrice: record.fields.DogePrice || "N/A",
      CardanoPrice: record.fields.CardanoPrice || "N/A",
      LitecoinPrice: record.fields.LitecoinPrice || "N/A",
      BNBPrice: record.fields.BnbPrice || "N/A",
      PolkadotPrice: record.fields.PolkadotPrice || "N/A",
    }));
    res.json(prices[0]);
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    res.status(500).json({ error: 'Failed to fetch data from Airtable' });
  }
});

// API to handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await base(process.env.AIRTABLE_TABLE_NAME2).create([
      {
        fields: {
          Name: name || '',
          Email: email || '',
          Phone: phone || '',
          Message: message || '',
        },
      },
    ]);
    res.status(200).json({ success: true, message: 'Data successfully submitted to Table2' });
  } catch (error) {
    console.error('Error submitting data to Airtable Table2:', error);
    res.status(500).json({ success: false, error: 'Failed to submit data to Airtable Table2' });
  }
});

// ** Catch-all route to serve React frontend **
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html')); // מחזיר את ה-index.html של React
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
