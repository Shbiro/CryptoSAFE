const express = require('express');
const Airtable = require('airtable');

const router = express.Router(); // ✅ יצירת router

// Airtable credentials
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_USERNAME = process.env.AIRTABLE_TABLE_USERNAME;

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// API to handle client login validation
router.post('/api/client-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const records = await base(AIRTABLE_TABLE_USERNAME).select().firstPage();

    const user = records.find(
      (record) =>
        record.fields.Username === username && record.fields.Password === password
    );

    if (user) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.fields.Username,
          email: user.fields.Email,
          firstname: user.fields.Firstname,
          lastname: user.fields.Lastname,
          phone: user.fields.Phone,
          confirm: user.fields.Confirm,
        },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('❌ Error validating credentials:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ✅ ייצוא ה-router כדי להשתמש בו בשרת הראשי
module.exports = router;
