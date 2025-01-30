require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Airtable = require('airtable');

// Airtable credentials
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;
const AIRTABLE_TABLE_NAME2 = process.env.AIRTABLE_TABLE_NAME2;
const AIRTABLE_TABLE_NAME3 = process.env.AIRTABLE_TABLE_NAME3; // הוספת משתנה סביבה זה

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Serve React frontend as static files
const buildPath = path.join(__dirname, 'build');
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

// API to handle login validation
app.post('/api/login', async (req, res) => {
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

app.post('/api/tasks', async (req, res) => {
  const { taskName, description, status } = req.body;

  try {
    await base(process.env.AIRTABLE_TABLE_NAME_TASKS).create([
      {
        fields: {
          TaskName: taskName || '', // שם המשימה
          Description: description || '', // תיאור
          Status: status || 'Not Started', // סטטוס (ברירת מחדל: Not Started)
        },
      },
    ]);
    res.status(200).json({ success: true, message: 'Task successfully added to Airtable' });
  } catch (error) {
    console.error('Error adding task to Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to add task to Airtable' });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME_TASKS).select().all();

    const tasks = records.map((record) => ({
      id: record.id,
      taskName: record.fields.TaskName || '',
      description: record.fields.Description || '',
      status: record.fields.Status || '',
    }));

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks from Airtable:', error);
    res.status(500).json({ error: 'Failed to fetch tasks from Airtable' });
  }
});

app.post('/api/privatetasks', async (req, res) => {
  const { taskName, description, status } = req.body;

  try {
    await base(process.env.AIRTABLE_TABLE_NAME_PRIVATE_TASKS).create([
      {
        fields: {
          TaskName: taskName || '', // שם המשימה
          Description: description || '', // תיאור
          Status: status || 'Not Started', // סטטוס (ברירת מחדל: Not Started)
        },
      },
    ]);
    res.status(200).json({ success: true, message: 'Private task successfully added to Airtable' });
  } catch (error) {
    console.error('Error adding private task to Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to add private task to Airtable' });
  }
});

app.get('/api/privatetasks', async (req, res) => {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME_PRIVATE_TASKS).select().all();

    const tasks = records.map((record) => ({
      id: record.id,
      taskName: record.fields.TaskName || '',
      description: record.fields.Description || '',
      status: record.fields.Status || '',
    }));

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching private tasks from Airtable:', error);
    res.status(500).json({ error: 'Failed to fetch private tasks from Airtable' });
  }
});

app.put('/api/privatetasks/update', async (req, res) => {
  const { id, taskName, description, status } = req.body;

  try {
    await base(process.env.AIRTABLE_TABLE_NAME_PRIVATE_TASKS).update([
      {
        id,
        fields: {
          TaskName: taskName || '',
          Description: description || '',
          Status: status || '',
        },
      },
    ]);

    res.status(200).json({ success: true, message: 'Task successfully updated' });
  } catch (error) {
    console.error('Error updating task in Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to update task in Airtable' });
  }
});

app.delete('/api/privatetasks/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Checking if task ${id} exists before deletion`);

  try {
    const record = await base(process.env.AIRTABLE_TABLE_NAME_PRIVATE_TASKS).find(id);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    await base(process.env.AIRTABLE_TABLE_NAME_PRIVATE_TASKS).destroy(id);
    console.log(`Task ${id} deleted successfully`);
    res.status(200).json({ success: true, message: 'Task successfully deleted' });
  } catch (error) {
    console.error('Error deleting task in Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to delete task in Airtable' });
  }
});

app.put('/api/tasks/update', async (req, res) => {
  const { id, taskName, description, status } = req.body;

  try {
    await base(process.env.AIRTABLE_TABLE_NAME_TASKS).update([
      {
        id,
        fields: {
          TaskName: taskName || '',
          Description: description || '',
          Status: status || '',
        },
      },
    ]);

    res.status(200).json({ success: true, message: 'Task successfully updated' });
  } catch (error) {
    console.error('Error updating task in Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to update task in Airtable' });
  }
});

app.delete('/api/tasks/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Checking if task ${id} exists before deletion`);

  try {
    const record = await base(process.env.AIRTABLE_TABLE_NAME_TASKS).find(id);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    await base(process.env.AIRTABLE_TABLE_NAME_TASKS).destroy(id);
    console.log(`Task ${id} deleted successfully`);
    res.status(200).json({ success: true, message: 'Task successfully deleted' });
  } catch (error) {
    console.error('Error deleting task in Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to delete task in Airtable' });
  }
});



// Catch-all route to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
