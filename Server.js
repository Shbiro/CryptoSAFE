require('dotenv').config();
const express = require('express');
const fs = require('fs');
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

const FRONTEND_BLOGS_PATH = path.join(__dirname, '../frontend/src/components/Blogs/Pages');
const APP_JS_PATH = path.join(__dirname, '../frontend/src/App.js');

// Middleware
app.use(cors());
app.use(express.json());
// 📌 נתיב סטטי לקובץ מפת האתר
app.use('/sitemap.xml', express.static(path.join(__dirname, 'sitemap.xml')));

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


// מאמרים
app.get('/api/blogs', async (req, res) => {
  try {
      const table = base(AIRTABLE_TABLE_NAME_BLOGS);
      const records = await table.select().all();

      const blogs = records.map(record => ({
          id: record.id,
          fileName: record.fields["שם הקובץ"] || '', // ✅ ווידוא שהשדה מחזיר את הערך הנכון!
          title: record.fields["כותרת המאמר"] || '',
          url: record.fields["URL"] || '',
          seoTitle: record.fields["Seo Title"] || '',
          seoDescription: record.fields["Seo Description"] || '',
          image: record.fields["תמונת שער"] ? record.fields["תמונת שער"][0].url : '',
          content: record.fields["תוכן מלא של המאמר"] || '',
          published: record.fields["האם המאמר מפורסם"] || false,
          tags: record.fields["תגיות נושא"] || [],
          author: record.fields["שם הכותב"] || '',
          category: record.fields["קטגוריית המאמר"] || '',
          views: record.fields["מספר צפיות במאמר"] || 0,
          likes: record.fields["מספר לייקים על המאמר"] || 0
      }));

      res.status(200).json(blogs);
  } catch (error) {
      console.error('❌ Error fetching blogs from Airtable:', error);
      res.status(500).json({ error: 'Failed to fetch blogs from Airtable' });
  }
});


app.post('/api/blogs', async (req, res) => {
  console.log("📢 Received data:", req.body);
  let { title, fileName, url, seoTitle, seoDescription, image, content, published, tags, author, category, views, likes } = req.body;

  if (!Array.isArray(tags)) {
      return res.status(400).json({ error: "Invalid tags format" });
  }

  try {
      await base(process.env.AIRTABLE_TABLE_NAME_BLOGS).create([
          {
              fields: {
                  "כותרת המאמר": title,
                  "שם הקובץ": fileName || '',
                  "URL": url,
                  "Seo Title": seoTitle,
                  "Seo Description": seoDescription,
                  "תמונת שער": image ? [{ url: image }] : [],
                  "תוכן מלא של המאמר": content,
                  "האם המאמר מפורסם": published || false,
                  "תגיות נושא": tags,
                  "שם הכותב": author,
                  "קטגוריית המאמר": category,
                  "מספר צפיות במאמר": views ? parseInt(views) : 0,
                  "מספר לייקים על המאמר": likes ? parseInt(likes) : 0
              }
          }
      ]);

      // ✅ שמירת קובץ טקסט עם כל הנתונים בתיקיית frontend
      saveBlogComponent(fileName, title, url, seoTitle, seoDescription, image, content, published, tags, author, category, views, likes);

      updateAppRoutes(fileName);

      updateBlogGallery(fileName, title, seoDescription, image);

      updateSitemap(fileName, url);

      res.status(201).json({ success: true, message: '✅ Blog added successfully', fileName });
  } catch (error) {
      console.error('❌ Error adding blog to Airtable:', error);
      res.status(500).json({ error: 'Failed to add blog to Airtable' });
  }
});



app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, filename, url, seoTitle, seoDescription, image, content, published, tags, author, category } = req.body;

  try {
      await base(process.env.AIRTABLE_TABLE_NAME_BLOGS).update([
          {
              id,
              fields: {
                  "כותרת המאמר": title || '',
                  "שם הקובץ": filename || '' ,
                  "URL": url || '',
                  "Seo Title": seoTitle || '',
                  "Seo Description": seoDescription || '',
                  "תמונת שער": image ? [{ url: image }] : [],
                  "תוכן מלא של המאמר": content || '',
                  "האם המאמר מפורסם": published || false,
                  "תגיות נושא": tags ? tags.split(',').map(tag => tag.trim()).filter(tag => allowedTags.includes(tag)) : [],
                  "שם הכותב": author || '',
                  "קטגוריית המאמר": category || ''
              }
          }
      ]);

      res.status(200).json({ success: true, message: '✅ Blog updated successfully' });
  } catch (error) {
      console.error('❌ Error updating blog:', error);
      res.status(500).json({ error: 'Failed to update blog' });
  }
});

/**
* 📌 מחיקת מאמר לפי ID
*/
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await base(process.env.AIRTABLE_TABLE_NAME_BLOGS).destroy(id);
      res.status(200).json({ success: true, message: '✅ Blog deleted successfully' });
  } catch (error) {
      console.error('❌ Error deleting blog:', error);
      res.status(500).json({ error: 'Failed to delete blog' });
  }
});

const saveBlogComponent = (fileName, title, url, seoTitle, seoDescription, image, content, published, tags, author, category, views, likes) => {
 
  if (!fileName) {
      console.error("❌ Missing file name, skipping file creation.");
      return;
  }

  // ✅ נתיב לשמירת הקובץ ב- `frontend/src/components/Blogs/Pages`
  const saveDirectory = path.join(process.cwd(), 'frontend/src/components/Blogs/Pages');
  const savePath = path.join(saveDirectory, `${fileName}.js`);

  // ✅ יצירת התיקייה אם היא לא קיימת
  if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
      console.log(`📁 Directory created: ${saveDirectory}`);
  }

  // ✅ המרת תוכן JSON לפורמט בטוח בקובץ React
  const safeTitle = JSON.stringify(title);
  const safeUrl = JSON.stringify(url);
  const safeSeoTitle = JSON.stringify(seoTitle);
  const safeSeoDescription = JSON.stringify(seoDescription);
  const safeImage = JSON.stringify(image);
  const safeContent = JSON.stringify(content);
  const safeTags = JSON.stringify(tags);
  const safeAuthor = JSON.stringify(author);
  const safeCategory = JSON.stringify(category);

  // ✅ יצירת תוכן הקובץ בפורמט של קומפוננטת React
  const fileContent = `
import React from 'react';
import BlogTemplate from '../BlogTemplate';

const ${fileName} = () => {
  return (
      <BlogTemplate 
          title={${safeTitle}}
          url={${safeUrl}}
          seoTitle={${safeSeoTitle}}
          seoDescription={${safeSeoDescription}}
          image={${safeImage}}
          content={${safeContent}}
          tags={${safeTags}}
          author={${safeAuthor}}
          category={${safeCategory}}
          views={${views}}
          likes={${likes}}
      />
  );
};

export default ${fileName};
`;

  // ✅ כתיבת הקובץ בפורמט JS
  try {
      fs.writeFileSync(savePath, fileContent, 'utf8');
      console.log(`✅ Blog component saved successfully at: ${savePath}`);
  } catch (error) {
      console.error(`❌ Error saving blog file: ${error.message}`);
  }
};


const updateAppRoutes = (fileName) => {
  const appPath = path.join(process.cwd(), 'frontend/src/App.js');

  // ✅ טוען את הקובץ של `App.js`
  let appContent = fs.readFileSync(appPath, 'utf8');

  // ✅ בדיקה אם הקובץ כבר מיובא
  if (!appContent.includes(`./components/Blogs/Pages/${fileName}`)) {
      console.log(`📝 Updating App.js with new blog: ${fileName}`);

      // ✅ יצירת שורת `import` חדשה
      const importStatement = `import ${fileName} from './components/Blogs/Pages/${fileName}.js';\n`;

      // ✅ מיקום להוספת ה-import לפני ה-`function App()`
      const importIndex = appContent.indexOf('function App()');
      appContent = appContent.slice(0, importIndex) + importStatement + appContent.slice(importIndex);

      // ✅ חיפוש מיקום להוספת ה-`Route` החדש
      const routeMarker = '<Route path="/blogs" element={<Blogs />} />';
      const newRoute = `            <Route path="/blogs/${fileName.toLowerCase()}" element={<${fileName} />} />\n`;

      if (appContent.includes(routeMarker)) {
          appContent = appContent.replace(routeMarker, newRoute + routeMarker);
      } else {
          console.error("❌ Could not find Route marker in App.js!");
          return;
      }

      // ✅ כתיבת העדכון לקובץ `App.js`
      fs.writeFileSync(appPath, appContent, 'utf8');
      console.log(`✅ App.js updated with new route: /blogs/${fileName.toLowerCase()}`);
  }
};


const updateBlogGallery = (fileName, title, seoDescription, image) => {
  const galleryPath = path.join(process.cwd(), 'frontend/src/components/Blogs/BlogGallery.js');

  // ✅ קריאת קובץ `BlogGallery.js`
  let galleryContent = fs.readFileSync(galleryPath, 'utf8');

  // ✅ בדיקה אם המאמר כבר קיים
  if (galleryContent.includes(`./Pages/${fileName}`)) {
      console.log(`🔹 Blog ${fileName} already exists in BlogGallery.js.`);
      return;
  }

  console.log(`📝 Updating BlogGallery.js with new blog: ${fileName}`);

  // ✅ יצירת import בצורה מסודרת
  const importStatement = `import ${fileName} from './Pages/${fileName}.js';\n`;

  // ✅ חיפוש המקום שבו נגמרים כל ה-importים
  const importEndIndex = galleryContent.lastIndexOf("import");
  const nextLineIndex = galleryContent.indexOf("\n", importEndIndex) + 1;
  galleryContent = galleryContent.slice(0, nextLineIndex) + importStatement + galleryContent.slice(nextLineIndex);

  // ✅ חיפוש מערך `articles`
  const articlesStart = galleryContent.indexOf('const articles = [') + 18;

  // ✅ המרת התוכן כדי למנוע שגיאות בגרשיים
  const safeTitle = JSON.stringify(title);
  const safeDescription = JSON.stringify(seoDescription);
  const safeImage = JSON.stringify(image);
  const safeLink = JSON.stringify(`/blogs/${fileName.toLowerCase()}`);

  // ✅ יצירת אובייקט חדש לרשימת המאמרים
  const newArticle = `
  {
      id: Math.floor(Math.random() * 10000),
      title: ${safeTitle},
      description: ${safeDescription},
      image: ${safeImage},
      link: ${safeLink} // ✅ קישור אוטומטי לעמוד הבלוג
  },`;

  // ✅ הוספת המאמר החדש למערך `articles`
  galleryContent = galleryContent.slice(0, articlesStart) + `\n${newArticle}` + galleryContent.slice(articlesStart);

  // ✅ שמירת העדכון ל- `BlogGallery.js`
  fs.writeFileSync(galleryPath, galleryContent, 'utf8');
  console.log(`✅ BlogGallery.js updated with new article: ${fileName}`);
};

const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

const updateSitemap = (fileName, url) => {
    console.log(`📝 Updating sitemap with new blog: ${fileName}`);

    // 1️⃣ קריאת קובץ ה-sitemap הנוכחי (אם קיים)
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://cryptosafe.co.il/</loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://cryptosafe.co.il/blogs</loc>
        <priority>0.9</priority>
    </url>
</urlset>`;

    if (fs.existsSync(SITEMAP_PATH)) {
        sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    }

    // 2️⃣ יצירת שורת URL חדשה עם `/blogs/`
    const newUrlEntry = `
    <url>
        <loc>https://cryptosafe.co.il/blogs/${url}</loc> 
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>0.7</priority>
    </url>`;

    // 3️⃣ בדיקה אם המאמר כבר קיים בסייטמאפ
    if (sitemapContent.includes(newUrlEntry.trim())) {
        console.log("🔹 Blog already exists in sitemap.");
        return;
    }

    // 4️⃣ הוספת כתובת המאמר החדשה לתוך `sitemap.xml`
    sitemapContent = sitemapContent.replace('</urlset>', `${newUrlEntry}\n</urlset>`);

    // 5️⃣ שמירת השינויים לקובץ `sitemap.xml`
    fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');

    console.log(`✅ Sitemap updated successfully: ${SITEMAP_PATH}`);
};

// מאמרים

// Catch-all route to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});