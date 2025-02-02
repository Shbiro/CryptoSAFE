import ETHCONTARCTS from './Pages/ETHCONTARCTS.js';
import WhatisBitcoin from './Pages/WhatisBitcoin.js';
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ הוספת קישורי ניווט
import BlogCard from './BlogCard';
import styles from './Blogs.module.css'; // CSS Modules

const articles = [

      {
          id: Math.floor(Math.random() * 10000),
          title: "אתריום - המהפכה הדיגיטלית שמשנה את עולם הפיננסים",
          description: "גלה מהו אתריום, כיצד הוא פועל, איך ניתן לרכוש אותו, ואיך הוא משנה את עולם הפיננסים והטכנולוגיה באמצעות חוזים חכמים ו-DeFi.",
          image: "https://cdn.pixabay.com/photo/2022/04/03/03/13/ethereum-7108003_1280.jpg",
          link: "/blogs/ethcontarcts" // ✅ קישור אוטומטי לעמוד הבלוג
      },

      {
          id: Math.floor(Math.random() * 10000),
          title: "ביטקוין - המטבע הדיגיטלי שמגדיר מחדש את הכלכלה",
          description: "גלה את כל מה שצריך לדעת על ביטקוין - כיצד הוא עובד, איך ניתן לרכוש אותו, איך לאחסן אותו בבטחה, ומה ההשפעה שלו על הכלכלה העולמית",
          image: "https://cdn.pixabay.com/photo/2017/12/17/14/12/bitcoin-3024279_960_720.jpg",
          link: "/blogs/whatisbitcoin" // ✅ קישור אוטומטי לעמוד הבלוג
      },


];

const BlogGallery = () => {
    return (
        <div className={styles.blogGallery}>
            {articles.map((article) => (
                <Link key={article.id} to={article.link} className={styles.blogLink}>
                    <BlogCard
                        title={article.title}
                        description={article.description}
                        image={article.image}
                    />
                </Link>
            ))}
        </div>
    );
};

export default BlogGallery;
