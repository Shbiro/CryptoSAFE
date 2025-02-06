import React from "react";
import { Helmet } from "react-helmet";
import "./HomePage.css";
import Header from "../Header/Header";
import CryptoSection1 from "./CryptoSection1";
import CryptoSection2 from "./CryptoSection2";
import PricingSection from "./PricingSection";
import AboutSection from "./AboutSection";
import ContactForm from "./ContactForm";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import CryptoPricesTable from "../CryptoPricesTable/CryptoPricesTable";
import Footer from "../Footer/Footer";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"; // ה-Hook

function HomePage() {
  const [section2Ref, isSection2Visible] = useIntersectionObserver(0.1);
  const [pricingRef, isPricingVisible] = useIntersectionObserver(0.1);
  const [aboutRef, isAboutVisible] = useIntersectionObserver(0.1);
  const [contactRef, isContactVisible] = useIntersectionObserver(0.1);

  return (
    <div className="homepage">
      <Helmet>
        <title>CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו</title>
        <meta
          name="description"
          content="CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו המובילה בניהול נכסים דיגיטליים. שירות אמין ובטוח להשקעות שלך."
        />
        <meta property="og:title" content="CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו" />
        <meta
          property="og:description"
          content="CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו המובילה בניהול נכסים דיגיטליים. שירות אמין ובטוח להשקעות שלך."
        />
        <meta property="og:image" content="https://cryptosafe.co.il/Ogimage.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://cryptosafe.co.il/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <main className="homepage-content">
        <CryptoSection1 />
        <CryptoPricesTable />

        {/* אפקט Slide-in ל- CryptoSection2 */}
        <div ref={section2Ref} className={`crypto-section2-wrapper ${isSection2Visible ? "slide-in" : ""}`}>
          <CryptoSection2 />
        </div>

        {/* אפקט Slide-in ל- PricingSection */}
        <div ref={pricingRef} className={`pricing-section-wrapper ${isPricingVisible ? "slide-in" : ""}`}>
          <PricingSection />
        </div>

        {/* אפקט Slide-in ל- AboutSection */}
        <div ref={aboutRef} className={`about-section-wrapper ${isAboutVisible ? "slide-in" : ""}`}>
          <AboutSection />
        </div>

        {/* אפקט Slide-in ל- ContactForm */}
        <div ref={contactRef} className={`contact-section-wrapper ${isContactVisible ? "slide-in" : ""}`}>
          <ContactForm />
        </div>

        <WhatsAppButton />
        <Footer />
      </main>
    </div>
  );
}

export default HomePage;
