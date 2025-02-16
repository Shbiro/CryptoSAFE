const express = require('express');
const Airtable = require('airtable');

const router = express.Router();

// Airtable credentials
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME_PRIVATE_TASKS = process.env.AIRTABLE_TABLE_NAME_PRIVATE_TASKS;

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// 📌 יצירת משימה פרטית חדשה
router.post('/api/privatetasks', async (req, res) => {
  const { taskName, description, status } = req.body;

  try {
    await base(AIRTABLE_TABLE_NAME_PRIVATE_TASKS).create([
      {
        fields: {
          TaskName: taskName || '',
          Description: description || '',
          Status: status || 'Not Started',
        },
      },
    ]);
    res.status(200).json({ success: true, message: 'Private task successfully added to Airtable' });
  } catch (error) {
    console.error('Error adding private task to Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to add private task to Airtable' });
  }
});

// 📌 שליפת כל המשימות הפרטיות
router.get('/api/privatetasks', async (req, res) => {
  try {
    const records = await base(AIRTABLE_TABLE_NAME_PRIVATE_TASKS).select().all();

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

// 📌 עדכון משימה פרטית קיימת
router.put('/api/privatetasks/update', async (req, res) => {
  const { id, taskName, description, status } = req.body;

  try {
    await base(AIRTABLE_TABLE_NAME_PRIVATE_TASKS).update([
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
    console.error('Error updating private task in Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to update task in Airtable' });
  }
});

// 📌 מחיקת משימה פרטית לפי ID
router.delete('/api/privatetasks/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Checking if task ${id} exists before deletion`);

  try {
    const record = await base(AIRTABLE_TABLE_NAME_PRIVATE_TASKS).find(id);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    await base(AIRTABLE_TABLE_NAME_PRIVATE_TASKS).destroy(id);
    console.log(`Task ${id} deleted successfully`);
    res.status(200).json({ success: true, message: 'Task successfully deleted' });
  } catch (error) {
    console.error('Error deleting private task in Airtable:', error);
    res.status(500).json({ success: false, error: 'Failed to delete task in Airtable' });
  }
});

module.exports = router;
