import React from 'react';
import { Helmet } from 'react-helmet';
import './HomePage.css';
import Header from '../Header/Header';
import CryptoSection1 from './CryptoSection1';
import CryptoSection2 from './CryptoSection2';
import PricingSection from './PricingSection';
import AboutSection from './AboutSection';
import ContactForm from './ContactForm';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import CryptoPricesTable from '../CryptoPricesTable/CryptoPricesTable'; // ייבוא הטבלה
import Footer from '../Footer/Footer';

function HomePage() {
  return (
    <div className="homepage">
      <Helmet>
    <title>CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו</title>
    <meta name="description" content="CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו המובילה בניהול נכסים דיגיטליים. שירות אמין ובטוח להשקעות שלך." />

    {/* ✅ תגיות Open Graph (שינוי תמונה) */}
    <meta property="og:title" content="CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו" />
    <meta property="og:description" content="CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו המובילה בניהול נכסים דיגיטליים. שירות אמין ובטוח להשקעות שלך." />
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
        <CryptoSection2 />
        <PricingSection />
        <AboutSection />
        <ContactForm />
        <WhatsAppButton />
        <Footer />
      </main>
    </div>
  );
}

export default HomePage;
