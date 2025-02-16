const express = require('express');
const Airtable = require('airtable');

const router = express.Router();

// Airtable credentials
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// API to fetch crypto prices from Airtable
router.get('/api/prices', async (req, res) => {
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

module.exports = router;
