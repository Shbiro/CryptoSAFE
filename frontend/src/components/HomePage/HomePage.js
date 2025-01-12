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

function HomePage() {
  return (
    <div className="homepage">
      <Helmet>
        <title>CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו</title>
        <meta
          name="description"
          content="CryptoSafe | קריפטוסייפ - חברת נאמנות לקריפטו המובילה בניהול נכסים דיגיטליים. שירות אמין ובטוח להשקעות שלך."
        />
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
      </main>
    </div>
  );
}

export default HomePage;
