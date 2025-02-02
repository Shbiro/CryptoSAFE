import HowBitcoinWork from './Pages/HowBitcoinWork.js';
import HowKeepSafeYourMoney from './Pages/HowKeepSafeYourMoney.js';
import ETHCONTARCTS from './Pages/ETHCONTARCTS.js';
import WhatisBitcoin from './Pages/WhatisBitcoin.js';
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ הוספת קישורי ניווט
import BlogCard from './BlogCard';
import styles from './Blogs.module.css'; // CSS Modules
import HowToChoseWallet from './Pages/HowToChoseWallet.js';

const articles = [

  {
      id: Math.floor(Math.random() * 10000),
      title: "\"איך לבחור ארנק קריפטו מאובטח? המדריך המלא לארנקים דיגיטליים\"",
      description: "מחפש את הדרך הבטוחה לשמור על הביטקוין שלך? במדריך הזה תגלה אילו סוגי ארנקים קיימים, כיצד להגן על הקריפטו שלך ולמה \"ארנק קר\" עדיף מ\"ארנק חם\".\n\n",
      image: "https://images.pexels.com/photos/3631991/pexels-photo-3631991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/howtochosewallet" // ✅ קישור אוטומטי לעמוד הבלוג
  },

      {
          id: Math.floor(Math.random() * 10000),
          title: "איך ביטקוין עובד? – מדריך טכני על בלוקצ'יין ומנגנון הכרייה",
          description: "למד כיצד ביטקוין פועל, מהו בלוקצ'יין, איך עובדת כריית ביטקוין ולמה הוא כל כך מהפכני. מדריך טכני ומפורט על הליבה של ביטקוין.",
          image: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          link: "/blogs/howbitcoinwork" // ✅ קישור אוטומטי לעמוד הבלוג
      },


      {
          id: Math.floor(Math.random() * 10000),
          title: "חברת נאמנות לקריפטו: כיצד לשמור על נכסי הקריפטו שלך בביטחון מלא?",
          description: "חברות נאמנות לקריפטו מציעות פתרונות לאבטחת מטבעות דיגיטליים והגנה מפני סיכונים. גלה כיצד הן פועלות, למי הן מתאימות, ואיך לבחור את החברה הנכונה עבורך.",
          image: "https://images.pexels.com/photos/4672714/pexels-photo-4672714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          link: "/blogs/howkeepsafeyourmoney" // ✅ קישור אוטומטי לעמוד הבלוג
      },

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
