import React from 'react';
import './HomePage.css';
import Header from '../Header/Header';
import CryptoSection1 from './CryptoSection1'; // ייבוא הקומפוננטה CryptoSection
import CryptoSection2 from './CryptoSection2'; // ייבוא הקומפוננטה CryptoSection
import PricingSection from './PricingSection';
import AboutSection  from './AboutSection';
import ContactForm   from './ContactForm';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

function HomePage() {
  return (
    <div className="homepage">
      <Header /> {/* מיקום ה-Header מעל התוכן של ה-HomePage */}
      <main className="homepage-content">
        <CryptoSection1 />
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
