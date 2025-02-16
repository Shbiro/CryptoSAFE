require('dotenv').config();
const express = require('express');
const Airtable = require('airtable');

const router = express.Router();

// Airtable credentials
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME2 = process.env.AIRTABLE_TABLE_NAME2;

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// API to handle contact form submission
router.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await base(AIRTABLE_TABLE_NAME2).create([
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

module.exports = router;
