import "./Contact.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ContactForm from "../HomePage/ContactForm";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import { Helmet } from "react-helmet";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"; // ייבוא ה-Hook

const Contact = () => {
  const [infoRef, isInfoVisible] = useIntersectionObserver(0.2);
  const [formRef, isFormVisible] = useIntersectionObserver(0.2);
  const [faqRef, isFaqVisible] = useIntersectionObserver(0.2);
  const [mapRef, isMapVisible] = useIntersectionObserver(0.2);

  return (
    <div className="contact-page">
      <Helmet>
        <title>צור קשר - Cryptosafe</title>
        <meta name="description" content="צור קשר עם Cryptosafe לקבלת מידע נוסף ושירות לקוחות מקצועי." />
        <meta name="keywords" content="Cryptosafe, צור קשר, שירות לקוחות, ביטקוין, אבטחת קריפטו" />
        <meta name="author" content="Cryptosafe Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="צור קשר - Cryptosafe" />
        <meta property="og:description" content="צור קשר עם Cryptosafe לקבלת מידע נוסף ושירות לקוחות מקצועי." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cryptosafe.co.il/contact" />
        <meta property="og:image" content="https://cryptosafe.co.il/Ogimage.png" />
        <meta property="og:image:secure_url" content="https://cryptosafe.co.il/og-image.jpg" />
      </Helmet>

      <Header />
      <h1 className="contact-title">יצירת קשר</h1>

      {/* מידע ליצירת קשר עם אפקט אנימציה */}
      <div ref={infoRef} className={`contact-info ${isInfoVisible ? "slide-in" : ""}`}>
        <div>
          <p>📍 כתובת:</p>
          <p><a href="tel:0502268395">יעקב דורי 7 רמלה</a></p>
        </div>
        <div>
          <p>📞 טלפון:</p>
          <p><a href="tel:0502268395">050-226-8395</a></p>
        </div>
        <div>
          <p>✉️ אימייל:</p>
          <p><a href="mailto:hori968@gmail.com">hori968@gmail.com</a></p>
        </div>
      </div>

      {/* טופס יצירת קשר עם אפקט אנימציה */}
      <div ref={formRef} className={`form ${isFormVisible ? "slide-in" : ""}`}>
        <ContactForm />
      </div>

      {/* רשתות חברתיות */}
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" />
        </a>
      </div>

      {/* שאלות נפוצות עם אפקט אנימציה */}
      <div ref={faqRef} className={`faq ${isFaqVisible ? "slide-in" : ""}`}>
        <h3>שאלות נפוצות</h3>
        <details>
          <summary>איך אני יכול ליצור קשר עם שירות הלקוחות?</summary>
          <p>ניתן ליצור קשר דרך הטופס, במייל או בטלפון.</p>
        </details>
        <details>
          <summary>מה זמן ההמתנה למענה?</summary>
          <p>בדרך כלל אנו חוזרים לכל הפניות תוך 24 שעות.</p>
        </details>
      </div>

      {/* מפה עם אפקט אנימציה */}
      <div ref={mapRef} className={`contact-map ${isMapVisible ? "slide-in" : ""}`}>
        <iframe
          title="map"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ borderRadius: "10px", marginTop: "20px" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.3891181481625!2d34.86426177585842!3d31.931003929897305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b32df0ebf01b%3A0xa0bfb66d8ccff2c1!2z16nXnNeV15LXkCDXpNeZ15nXnCDXl9eR16ogNywg15DXqtei16jXnA!5e0!3m2!1siw!2sil!4v1707234590000"
          allowFullScreen
        ></iframe>
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Contact;
