import React, { useState } from 'react';
import styles from './Blogs.module.css'; // ✅ קובץ CSS ייחודי

const BlogsBo = () => {
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        seoTitle: "",
        seoDescription: "",
        image: "",
        content: "",
        selectedTags: [], // ✅ שמירת התגיות הנבחרות
        author: "",
        category: "",
        views: 0,
        likes: 0,
        published: false,
        fileName: "" // ✅ שדה חדש לשם קובץ
    });

    // ✅ רשימת תגיות מוגדרת מראש
    const allowedTags = ["ביטקוין", "חברת נאמנות", "Bitcoin", "השקעות"];
    const allowedAuthors = ["אמיר אטיאס הורי", "המאמר נכתב ב ai"];
    const allowedCategories = ["Ethereum", "Bitcoin"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleTagChange = (tag) => {
        setFormData(prevState => ({
            ...prevState,
            selectedTags: prevState.selectedTags.includes(tag)
                ? prevState.selectedTags.filter(t => t !== tag)
                : [...prevState.selectedTags, tag]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("https://cryptosafe.co.il/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.selectedTags, 
                    fileName: formData.fileName // ✅ לוודא ששם הקובץ נשלח!
                }),
            });
    
            if (response.ok) {
                alert("✅ מאמר נוסף בהצלחה!");
                setFormData({
                    title: "",
                    url: "",
                    seoTitle: "",
                    seoDescription: "",
                    image: "",
                    content: "",
                    selectedTags: [],
                    author: "",
                    category: "",
                    views: 0,
                    likes: 0,
                    published: false,
                    fileName: "" // ✅ איפוס שם הקובץ לאחר השליחה
                });
            } else {
                alert("❌ שגיאה בהוספת המאמר!");
            }
        } catch (error) {
            console.error("❌ Error:", error);
            alert("❌ שגיאה בשליחת הנתונים!");
        }
    };

    return (
        <div className={styles.blogsBoContainer}> {/* ✅ className ייחודי לכל הקומפוננטה */}
            <h1 className={styles.blogsBoTitle}>📝 ניהול מאמרים</h1>
            <form onSubmit={handleSubmit} className={styles.blogsBoForm}>

                <label className={styles.blogsBoLabel}>📌 כותרת:</label>
                <input type="text" name="title" className={styles.blogsBoInput} value={formData.title} onChange={handleChange} required />

                <label className={styles.blogsBoLabel}>📂 שם הקובץ:</label>
                <input type="text" name="fileName" className={styles.blogsBoInput} value={formData.fileName} onChange={handleChange} required />

                <label className={styles.blogsBoLabel}>🔗 URL:</label>
                <input type="text" name="url" className={styles.blogsBoInput} value={formData.url} onChange={handleChange} required />

                <label className={styles.blogsBoLabel}>🎯 Seo Title:</label>
                <input type="text" name="seoTitle" className={styles.blogsBoInput} value={formData.seoTitle} onChange={handleChange} required />

                <label className={styles.blogsBoLabel}>📖 Seo Description:</label>
                <textarea name="seoDescription" className={styles.blogsBoTextarea} value={formData.seoDescription} onChange={handleChange} required />

                <label className={styles.blogsBoLabel}>🖼️ כתובת תמונה:</label>
                <input type="text" name="image" className={styles.blogsBoInput} value={formData.image} onChange={handleChange} />

                <label className={styles.blogsBoLabel}>📝 תוכן מלא:</label>
                <textarea name="content" className={styles.blogsBoTextarea} value={formData.content} onChange={handleChange} required />

                {/* ✅ רשימת תגיות עם צ'קבוקסים */}
                <label className={styles.blogsBoLabel}>🏷️ תגיות:</label>
                <div className={styles.blogsBoTagsContainer}>
                    {allowedTags.map(tag => (
                        <label key={tag} className={styles.blogsBoTagCheckbox}>
                            <input
                                type="checkbox"
                                checked={formData.selectedTags.includes(tag)}
                                onChange={() => handleTagChange(tag)}
                            />
                            {tag}
                        </label>
                    ))}
                </div>

                <label className={styles.blogsBoLabel}>✍️ כותב:</label>
                <select name="author" className={styles.blogsBoSelect} value={formData.author} onChange={handleChange} required>
                    <option value="">בחר כותב</option>
                    {allowedAuthors.map((author, index) => (
                        <option key={index} value={author}>{author}</option>
                    ))}
                </select>

                <label className={styles.blogsBoLabel}>📂 קטגוריה:</label>
                <select name="category" className={styles.blogsBoSelect} value={formData.category} onChange={handleChange} required>
                    <option value="">בחר קטגוריה</option>
                    {allowedCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                <label className={styles.blogsBoLabel}>👀 מספר צפיות:</label>
                <input type="number" name="views" className={styles.blogsBoInput} value={formData.views} onChange={handleChange} />

                <label className={styles.blogsBoLabel}>❤️ מספר לייקים:</label>
                <input type="number" name="likes" className={styles.blogsBoInput} value={formData.likes} onChange={handleChange} />

                <label className={styles.blogsBoLabel}>📢 האם לפרסם את המאמר?</label>
                <input type="checkbox" name="published" className={styles.blogsBoCheckbox} checked={formData.published} onChange={handleChange} />

                <button type="submit" className={styles.blogsBoButton}>📩 הוסף מאמר</button>
            </form>
        </div>
    );
};

export default BlogsBo;
