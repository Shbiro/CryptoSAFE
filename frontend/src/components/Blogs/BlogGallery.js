import HowBitcoinWork from './Pages/HowBitcoinWork.js';
import HowKeepSafeYourMoney from './Pages/HowKeepSafeYourMoney.js';
import ETHCONTARCTS from './Pages/ETHCONTARCTS.js';
import WhatisBitcoin from './Pages/WhatisBitcoin.js';
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ הוספת קישורי ניווט
import BlogCard from './BlogCard';
import styles from './Blogs.module.css'; // CSS Modules
import HowToChooseWallet from './Pages/HowToChooseWallet.js';
import AmIBeingScammed from './Pages/AmIBeingScammed.js';
import { Helmet } from 'react-helmet';
import Miningbitcoin from './Pages/Miningbitcoin.js';
import Trumpusdt from './Pages/Trumpusdt.js';
import Xrpusdt from './Pages/Xrpusdt.js';
import Dogeusdt from './Pages/Dogeusdt.js';
import ElonMuskSpacex from './Pages/ElonMuskSpacex.js';
import ElonMuskTesla from './Pages/ElonMuskTesla.js';
import BigcompanyAndBitcoin from './Pages/BigcompanyAndBitcoin.js';
import HowToOpenCryptoWallet from './Pages/HowToOpenCryptoWallet.js';
import TheBiggestCryptoExchange from './Pages/TheBiggestCryptoExchange.js';
import DarkCrypto from './Pages/DarkCrypto.js';
import HowToStartWithCrypto from './Pages/HowToStartWithCrypto.js';
import Roeyheshboncrypto from './Pages/Roeyheshboncrypto.js';

const articles = [

  {
      id: Math.floor(Math.random() * 10000),
      title: " רואה חשבון לקריפטו – מי צריך את זה ואיך לבחור נכון",
      description: "המאמר הזה נועד לכל מי שעוסק בקריפטו ושואל את עצמו האם אני צריך רואה חשבון לקריפטו?. נסביר בפירוט מי צריך רואה חשבון לקריפטו, כיצד מיסוי הקריפטו עובד, איך ניתן להימנע מקנסות מיותרים, אילו שירותים רואה חשבון לקריפטו מספק, ומה חשוב לבדוק לפני שבוחרים רואה חשבון מתאים.\n\nעם ההתפתחות המהירה של שוק הקריפטו, הרשויות החלו לאכוף מיסים על מסחר והחזקת מטבעות דיגיטליים, ולכן ניהול נכון של המיסוי יכול לחסוך לך כסף רב. אם אתה סוחר או משקיע בקריפטו ורוצה להבין איך להתנהל בצורה נכונה מול רשויות המס – המדריך הזה הוא בדיוק בשבילך! 🚀",
      image: "https://images.pexels.com/photos/7567497/pexels-photo-7567497.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/blogs/roeyheshboncrypto" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "איך להתחיל עם קריפטו – המדריך המלא למתחילים",
      description: "המאמר הזה נועד לכל מי שרוצה להיכנס לעולם הקריפטו אבל לא יודע מאיפה להתחיל. כאן נסביר בפירוט מה זה קריפטו, איך קונים ומוכרים מטבעות דיגיטליים, מה זה בלוקצ'יין, איך לבחור ארנק קריפטו, אילו פלטפורמות מסחר הכי טובות, ואיך להימנע מהונאות. זהו המדריך השלם למתחילים – צעד אחר צעד, כך שתוכל להתחיל בביטחון ולהימנע מטעויות נפוצות. 🚀",
      image: "https://images.pexels.com/photos/1447418/pexels-photo-1447418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/howtostartwithcrypto" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "דארק קריפטו: המטבעות, הסכנות, והדרך להגן על עצמך",
      description: "המאמר הזה יעסוק בעולם הסודי של \"דארק קריפטו\" (Dark Crypto) – שימוש בקריפטו באזורים הלא מוארים של האינטרנט, כולל יתרונות, סכנות, ואתיקה של השימוש במטבעות דיגיטליים באזורים כמו הדארקנט. נחקור כיצד מטבעות קריפטוגרפיים כמו מונרו (XMR) וביטקוין (BTC) משמשים בעסקאות אנונימיות, אילו מנגנוני פרטיות מאפשרים זאת, וכיצד להגן על עצמך מפני הונאות וסיכונים. זהו מדריך למי שרוצה להבין את הצד הפחות מוכר של הקריפטו ולדעת כיצד להשתמש בו בבטחה. 🔥\n\n",
      image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/darkcrypto" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "בורסות הקריפטו הגדולות בעולם – המדריך השלם לסוחרים ומשקיעים",
      description: "המאמר הזה יספק סקירה מקיפה על בורסות הקריפטו הגדולות בעולם. נסביר איך הן פועלות, מה היתרונות והחסרונות של כל אחת, ואילו בורסות נחשבות לבטוחות ולמתקדמות ביותר למסחר בקריפטו. בנוסף, נסקור גורמים חשובים לבחירת בורסה, כולל עמלות, אבטחה, נפח מסחר, ושירות לקוחות. אם אתה מחפש את הפלטפורמה הטובה ביותר לקנייה ומכירה של מטבעות קריפטו – מאמר זה הוא בדיוק בשבילך! 🚀\n\n",
      image: "https://images.pexels.com/photos/14348480/pexels-photo-14348480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/thebiggestcryptoexchange" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "המדריך המלא: איך לפתוח ארנק קריפטו בצורה בטוחה ויעילה",
      description: "המאמר הזה יספק מדריך מפורט על איך לפתוח ארנק קריפטו בצורה בטוחה ונכונה. במאמר נסקור את סוגי הארנקים הקיימים, נבין כיצד לבחור את הארנק המתאים, נלמד כיצד להגדיר ארנק דיגיטלי שלב אחר שלב, ונבחן דרכים לאבטח את הנכסים הדיגיטליים שלך. בנוסף, נדון בטעויות נפוצות שיש להימנע מהן ונענה על שאלות נפוצות בנושא.\n\n",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/howtoopencryptowallet" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "חברות ענק והקשר שלהן לביטקוין – מהפכה פיננסית או טרנד חולף?",
      description: "בעשור האחרון, ביטקוין הפך ממטבע דיגיטלי ניסיוני למערכת פיננסית גלובלית שמושכת עניין רחב מצד חברות הענק הגדולות בעולם. חברות כמו Tesla, MicroStrategy, Square ואפילו ענקיות כמו PayPal ו-Mastercard כבר אימצו את ביטקוין בדרכים שונות – בין אם כהשקעה אסטרטגית, כאמצעי תשלום או כחלק מאסטרטגיות פיתוח פיננסיות.\n\nבמאמר זה נסקור כיצד החברות הגדולות משלבות ביטקוין במודל העסקי שלהן, ההשפעה שלהן על מחיר השוק, האתגרים שהן מתמודדות איתם, ומה צופן העתיד עבור תאגידים וביטקוין.\n\n",
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/bigcompanyandbitcoin" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "אילון מאסק וטסלה – מהפכת הרכב החשמלי והעתיד של התחבורה העולמית",
      description: "אילון מאסק (Elon Musk) הוא אחד היזמים המשפיעים ביותר של דורנו, עם חזון להפוך את העולם ליעיל, טכנולוגי ובר-קיימא. אחת החברות המרכזיות ביותר שבבעלותו היא Tesla, שהפכה ממיזם קטן לחלוטין ליצרנית הרכבים החשמליים הגדולה והמתקדמת בעולם. במאמר זה נסקור את ההיסטוריה של טסלה, החזון של אילון מאסק, הפיתוחים החדשניים של החברה, ההשפעה שלה על תעשיית הרכב, האתגרים שעומדים בפניה והעתיד של התחבורה החשמלית.",
      image: "https://images.pexels.com/photos/28123191/pexels-photo-28123191/free-photo-of-the-tesla-model-s-is-shown-in-this-image.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/elonmusktesla" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "אילון מאסק ו-SpaceX – המהפכה של חקר החלל והעתיד של האנושות",
      description: "אילון מאסק (Elon Musk) הוא אחת הדמויות המשפיעות ביותר בעידן המודרני, יזם וטכנולוג פורץ דרך שמוביל מהפכות בתעשיות שונות. אחת מהחברות הבולטות ביותר בבעלותו היא SpaceX, שנוסדה במטרה להפוך את המסע לחלל לנגיש ולבנות עתיד שבו האנושות תוכל לחיות מחוץ לכדור הארץ. במאמר זה נסקור את סיפורו של אילון מאסק, כיצד הקים את SpaceX, ההישגים המרכזיים של החברה, החזון שלה לעתיד, והאתגרים שעומדים בפניה.",
      image: "https://images.pexels.com/photos/12861275/pexels-photo-12861275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/elonmuskspacex" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: " DOGE/USDT – כל מה שצריך לדעת על הדוג'קוין במסחר קריפטו",
      description: "מטבע DOGE/USDT הוא אחד מצמדי המסחר הפופולריים ביותר בשוק הקריפטו. דוג'קוין (DOGE), שהחל כבדיחה, הפך לאחד המטבעות הדיגיטליים המדוברים ביותר, בעיקר בשל הקהילה הגדולה שסביבו והתמיכה של יזמים בולטים. במאמר זה נסקור את ההיסטוריה של דוג'קוין, כיצד הוא פועל, המסחר מול USDT, הגורמים המשפיעים על מחירו, והאם הוא נשאר רלוונטי גם היום.",
      image: "https://images.pexels.com/photos/7767506/pexels-photo-7767506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/dogeusdt" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: " XRP/USDT – כל מה שצריך לדעת על מסחר במטבע הקריפטוגרפי של ריפל",
      description: "מטבע XRP/USDT הוא אחד מצמדי המסחר הפופולריים ביותר בעולם הקריפטו. XRP, המטבע של ריפל (Ripple), נועד להקל על עסקאות פיננסיות חוצות גבולות במהירות ובעלויות נמוכות. במאמר זה נסקור את ההיסטוריה של XRP, כיצד הוא פועל, השימושים האפשריים שלו, המסחר בצמד XRP/USDT, הגורמים המשפיעים על מחירו, והאם הוא מהווה הזדמנות מסחרית מעניינת.",
      image: "https://images.pexels.com/photos/6780914/pexels-photo-6780914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/xrpusdt" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "מטבע TRUMP/USDT – כל מה שצריך לדעת על המטבע הקריפטוגרפי המדובר",
      description: "מטבע TRUMP/USDT הוא מטבע קריפטוגרפי שזכה לעניין רב בקרב משקיעים וסוחרים. במאמר זה נסקור את המאפיינים של המטבע, ההיסטוריה שלו, השימושים האפשריים, הבורסות שבהן ניתן לסחור בו, והאתגרים הקשורים אליו.",
      image: "https://images.pexels.com/photos/936237/pexels-photo-936237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/trumpusdt" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "🚀 כריית ביטקוין – כל מה שצריך לדעת על הדרך לכרות ולהרוויח ביטקוין",
      description: "במאמר זה נצלול אל עולם כריית הביטקוין ונבין כיצד היא פועלת, אילו ציוד ותוכנות נדרשים לתהליך, כיצד ניתן להרוויח ממנה, מהם האתגרים שהיא מציבה, והאם היא עדיין משתלמת בשנת 2024. נלמד גם על ההבדלים בין כרייה עצמאית לבריכות כרייה, ונקבל טיפים מעשיים לכל מי שמעוניין להתחיל לכרות ביטקוין.",
      image: "https://images.pexels.com/photos/6778581/pexels-photo-6778581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/miningbitcoin" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "איך לזהות תרמית קריפטו ולהימנע מהונאות בעולם הדיגיטלי?",
      description: "🚨 \"גלה איך לזהות תרמיות קריפטו ולהגן על ההשקעות שלך! מדריך מקיף על סוגי ההונאות, הסימנים המחשידים, והדרכים הטובות ביותר לשמור על הביטקוין והנכסים הדיגיטליים שלך בטוחים.\"",
      image: "https://images.pexels.com/photos/7111619/pexels-photo-7111619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/amibeingscammed" // ✅ קישור אוטומטי לעמוד הבלוג
  },

  {
      id: Math.floor(Math.random() * 10000),
      title: "\"איך לבחור ארנק קריפטו מאובטח? המדריך המלא לארנקים דיגיטליים\"",
      description: "מחפש את הדרך הבטוחה לשמור על הביטקוין שלך? במדריך הזה תגלה אילו סוגי ארנקים קיימים, כיצד להגן על הקריפטו שלך ולמה \"ארנק קר\" עדיף מ\"ארנק חם\".\n\n",
      image: "https://images.pexels.com/photos/3631991/pexels-photo-3631991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/blogs/howtochoosewallet" // ✅ קישור אוטומטי לעמוד הבלוג
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
              <Helmet>
        <title>בלוג קריפטו - CryptoSafe</title>
        <meta name="description" content="הבלוג של CryptoSafe - כל מה שצריך לדעת על ביטקוין, אתריום, ארנקים דיגיטליים ואבטחת נכסים קריפטוגרפיים." />
        <meta property="og:title" content="בלוג קריפטו - CryptoSafe" />
        <meta property="og:description" content="מאמרים מקצועיים על קריפטו, בלוקצ'יין ואבטחת מטבעות דיגיטליים. גלה כיצד לשמור על ההשקעות שלך." />
        <meta property="og:image" content="https://cryptosafe.co.il/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://cryptosafe.co.il/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
      </Helmet>    
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
