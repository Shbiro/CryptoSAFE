const express = require('express');
const Airtable = require('airtable');

const router = express.Router();

// Airtable credentials
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME3 = process.env.AIRTABLE_TABLE_NAME3;

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// API to handle login validation
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user credentials from Airtable
    const records = await base(AIRTABLE_TABLE_NAME3).select().firstPage();

    const isValidUser = records.some(
      (record) =>
        record.fields.UserName === username && record.fields.PassWord === password
    );

    if (isValidUser) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error validating credentials:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
