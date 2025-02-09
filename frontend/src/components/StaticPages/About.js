import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import "./About.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"; // ייבוא ה-Hook
import CryptoSection2 from "../HomePage/CryptoSection2";
const About = () => {
    const navigate = useNavigate();
    const [infoRef, isInfoVisible] = useIntersectionObserver(0.1);
    const [formRef, isFormVisible] = useIntersectionObserver(0.1);
    const [faqRef, isFaqVisible] = useIntersectionObserver(0.1);
    return (
        <div className="about-container">
<Helmet>
    <title>אודות - Cryptosafe</title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Cryptosafe היא פלטפורמה מאובטחת לביצוע עסקאות תיווך פרטיות באמצעות קריפטו, תוך שמירה על נאמנות וביטחון בין הצדדים. אנו מציעים גם אחסון קריפטו מאובטח בארנקים קרים." />
    <meta name="keywords" content="קריפטו, ביטקוין, תיווך קריפטו, עסקאות קריפטו, מסחר ביטקוין, נאמנות קריפטו, ארנק קר, אחסון ביטקוין" />
    <meta name="author" content="Cryptosafe" />

    {/* Meta Tags for Social Media (Open Graph for Facebook & LinkedIn) */}
    <meta property="og:title" content="אודות Cryptosafe - תיווך קריפטו ואחסון מאובטח" />
    <meta property="og:description" content="הפתרון הבטוח לעסקאות קריפטו פרטיות - נאמנות קריפטו עם אבטחה מקסימלית ואחסון בארנקים קרים." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://cryptosafe.co.il/about" />
    <meta property="og:image" content="https://cryptosafe.co.il/Ogimage.png" />
    <meta property="og:image:secure_url" content="https://cryptosafe.co.il/og-image.jpg" />

    {/* Twitter Meta Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="אודות Cryptosafe - תיווך קריפטו ואחסון מאובטח" />
    <meta name="twitter:description" content="הפתרון הבטוח לעסקאות קריפטו פרטיות - נאמנות קריפטו עם אבטחה מקסימלית ואחסון בארנקים קרים." />
    <meta name="twitter:image" content="https://cryptosafe.co.il/Ogimage.png" />
</Helmet>
            <Header />
            <div ref={infoRef} className={`about-content ${isInfoVisible ? "slide-in" : ""}`}>
                <h1 className="about-titlePAGE">אודות Cryptosafe</h1>
                <p className="about-text">
                    Cryptosafe היא הפלטפורמה המובילה לביצוע עסקאות תיווך פרטיות באמצעות קריפטו, 
                    תוך שמירה על ביטחון ונאמנות מלאה בין שני הצדדים. אנו מבינים שהעולם הפיננסי 
                    משתנה במהירות, ושימוש במטבעות דיגיטליים הופך לנפוץ יותר בעסקאות פרטיות ועסקיות. 
                    עם זאת, האתגרים הכרוכים בהעברת נכסים קריפטוגרפיים בצורה בטוחה מחייבים פתרון אמין, 
                    ולכן אנו כאן.
                </p>
                <h2 className="about-subtitle">מה אנחנו מציעים?</h2>
                <p className="about-text">
                    הבעיה המרכזית בעסקאות קריפטו היא האמון – איך ניתן להבטיח שהצד השני יעמוד בהתחייבויותיו? 
                    לדוגמא, אם אדם מעוניין לרכוש רכב באמצעות קריפטו, הוא נמצא בסיכון: האם המוכר יעביר את 
                    הרכב לאחר קבלת התשלום? האם הקונה יעביר את התשלום לאחר שהרכב הועבר לבעלותו? 
                    בדיוק כאן אנו נכנסים לתמונה.
                </p>
                <p className="about-text">
                    אנו משמשים כצד שלישי נאמן ומגשר בין שני הצדדים. כאשר עסקה מתבצעת דרכנו, הכסף נשמר
                    בארנק מאובטח עד להשלמת כל התנאים שסוכמו מראש. רק לאחר שווידאנו שכל שלב בוצע כראוי,
                    נבצע את השחרור הכספי לצד הרלוונטי.
                </p>
                <h2 className="about-subtitle">אבטחה מקסימלית לקריפטו שלך</h2>
                <p className="about-text">
                    מעבר לעסקאות תיווך, אנו מציעים שירותי אחסון קריפטו בארנקים קרים (Cold Wallets).
                    ארנקים אלו אינם מחוברים לרשת האינטרנט, ולכן מספקים את רמת ההגנה הגבוהה ביותר מפני
                    פריצות, מתקפות סייבר וגניבות דיגיטליות. האחסון שלנו מיועד לאנשים פרטיים ולחברות
                    שרוצות להבטיח שהנכסים הדיגיטליים שלהם נשמרים בבטחה לאורך זמן.
                </p>
                </div>
                <div ref={formRef} className={`about-content2 ${isFormVisible ? "slide-in" : ""}`}>
                <h2 className="about-subtitle">למה לבחור ב-Cryptosafe?</h2>
                <ul className="about-list">
                    <li><strong>נאמנות וביטחון:</strong> אנו מחויבים לשמירה על אמינות מוחלטת בין הצדדים.</li>
                    <li><strong>מינימום עלויות:</strong> התיווך שלנו מאפשר חיסכון משמעותי בעלויות עסקה.</li>
                    <li><strong>שירות אישי:</strong> צוות מומחים מנוסה מלווה כל לקוח לאורך כל תהליך העסקה.</li>
                    <li><strong>אחסון קריפטו מאובטח:</strong> פתרונות ארנק קר מבטיחים ביטחון מרבי.</li>
                </ul>
                <p className="about-text">
                    אצלנו ב-Cryptosafe, אנו שואפים להפוך את עולם הקריפטו לבטוח ונגיש יותר לכל אחד.
                    בין אם אתה מחפש לבצע עסקת תיווך מאובטחת או לשמור את נכסי הקריפטו שלך במקום הבטוח
                    ביותר – אנחנו כאן בשבילך. צור איתנו קשר עוד היום ונלווה אותך בכל שלב בדרך.
                </p>
                <button 
            className="contact-button" 
            onClick={() => navigate("/contact")}
        >
            צור קשר
        </button>
        </div>
        <div ref={faqRef} className={`about-content3 ${isFaqVisible ? "slide-in" : ""}`}>
        <CryptoSection2 />
            </div>
            <WhatsAppButton />
            <Footer />
        </div>
        
    );
};

export default About;