import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './BlogTemplate.module.css';
import Header from '../Header/Header';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import CryptoPricesTable from '../CryptoPricesTable/CryptoPricesTable'; // ייבוא הטבלה
import Footer from '../Footer/Footer';

const BlogTemplate = ({ title, url, seoTitle, seoDescription, image, content, tags, author, category, views, likes }) => {

    // ✅ הפיכת תוכן המאמר לפורמט HTML עם כותרות ורווחים
    const formatContentToHtml = (text) => {
        return text
            .replace(/\n{2,}/g, "</p><p>") // פסקאות
            .replace(/\n/g, "<br>") // שורות חדשות
            .replace(/🔹\s*(.*?)\n/g, "<h2>$1</h2>") // כותרות H2
            .replace(/📌\s*(.*?)\n/g, "<h3>$1</h3>") // כותרות H3
            .replace(/✔️\s*(.*?)\n/g, "<li>$1</li>") // רשימות
            .replace(/🚀\s*(.*?)\n/g, "<h2>$1</h2>") // כותרות מודגשות
            .replace(/🔥\s*(.*?)\n/g, "<h3>$1</h3>") // כותרות משנה
            .replace(/<p><\/p>/g, ""); // הסרת רווחים מיותרים
    };

    return (
        <div className={styles.blogContainer}>
            {/* ✅ עדכון כותרת הדף לפי שם המאמר */}
            <Helmet>
                <title>{`CryptoSafe | ${title}`}</title>
                <meta name="description" content={seoDescription} />
                
                {/* ✅ תגיות Open Graph */}
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content="https://cryptosafe.co.il/Ogimage.png" /> 
                <meta property="og:image:secure_url" content="https://cryptosafe.co.il/og-image.jpg" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://yourwebsite.com/blogs/${url}`} />

                {/* ✅ תגיות Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={image} />

                {/* ✅ תגיות SEO נוספות */}
                <meta name="author" content={author} />
                <meta name="keywords" content={tags.join(', ')} />
                <meta name="robots" content="index, follow" />
                <meta httpEquiv="content-language" content="he" />
            </Helmet>
            <Header />

            {/* ✅ כותרת */}
            <h1 className={styles.blogTitle}>{title}</h1>

            {/* ✅ תמונת שער */}
            {image && <img src={image} alt={title} className={styles.blogImage} />}

            {/* ✅ פרטי המאמר */}
            <div className={styles.blogMeta}>
                <span>✍️ מאת: {author}</span>
                <span>📂 קטגוריה: {category}</span>
                <span>👀 צפיות: {views}</span>
                <span>❤️ לייקים: {likes}</span>
            </div>

            {/* ✅ תוכן המאמר עם HTML מובנה */}
            <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: formatContentToHtml(content) }} />

            {/* ✅ תגיות */}
            {tags.length > 0 && (
                <div className={styles.blogTags}>
                    <strong>🏷️ תגיות:</strong>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles.blogTag}>{tag}</span>
                    ))}
                </div>
            )}
            <WhatsAppButton />
            <div>
                <h1>Crypto Price</h1>
                <CryptoPricesTable />
                <Footer />
            </div>
        </div>
    );
};

export default BlogTemplate;
