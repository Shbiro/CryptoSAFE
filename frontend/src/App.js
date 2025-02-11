import React, { useEffect } from 'react'; // ✅ הוספת useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UseScrollToTop from "./hooks/UseScrollToTop"; // ייבוא ה-hook
import HomePage from './components/HomePage/HomePage';
import BackOffice from './components/BackOffice/BackOffice';
import Tasks from './components/Tasks/Tasks';
import PrivateTasks from './components/Tasks/PrivateTasks';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Blogs from './components/Blogs/Blogs.js';
import BlogsBo from './components/Blogs/BlogsBo.js';
import WhatisBitcoin from './components/Blogs/Pages/WhatisBitcoin.js';
import ETHCONTARCTS from './components/Blogs/Pages/ETHCONTARCTS.js';
import HowKeepSafeYourMoney from './components/Blogs/Pages/HowKeepSafeYourMoney.js';
import HowBitcoinWork from './components/Blogs/Pages/HowBitcoinWork.js';
import HowToChooseWallet from './components/Blogs/Pages/HowToChooseWallet.js';
import AmIBeingScammed from './components/Blogs/Pages/AmIBeingScammed.js';
import Contact from './components/StaticPages/Contact.js';
import About from './components/StaticPages/About.js';
import Miningbitcoin from './components/Blogs/Pages/Miningbitcoin.js';
import Trumpusdt from './components/Blogs/Pages/Trumpusdt.js';
import Xrpusdt from './components/Blogs/Pages/Xrpusdt.js';
import Dogeusdt from './components/Blogs/Pages/Dogeusdt.js';
import ElonMuskSpacex from './components/Blogs/Pages/ElonMuskSpacex.js';
import ElonMuskTesla from './components/Blogs/Pages/ElonMuskTesla.js';
import BigcompanyAndBitcoin from './components/Blogs/Pages/BigcompanyAndBitcoin.js';
import HowToOpenCryptoWallet from './components/Blogs/Pages/HowToOpenCryptoWallet.js';
import TheBiggestCryptoExchange from './components/Blogs/Pages/TheBiggestCryptoExchange.js';
import DarkCrypto from './components/Blogs/Pages/DarkCrypto.js';
import HowToStartWithCrypto from './components/Blogs/Pages/HowToStartWithCrypto.js';


























import ReactGA from 'react-ga4';
ReactGA.initialize('G-TRGKHQC4LF');
function App() {

  useEffect(() => {
    // ✅ שליחת PageView לכל שינוי בנתיב
    ReactGA.send("pageview");
  }, []);
  return (
    
    <AuthProvider>
      <Router>
      <UseScrollToTop />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs/whatisbitcoin" element={<WhatisBitcoin />} />
            <Route path="/blogs/ethcontarcts" element={<ETHCONTARCTS />} />
            <Route path="/blogs/howkeepsafeyourmoney" element={<HowKeepSafeYourMoney />} />
            <Route path="/blogs/howbitcoinwork" element={<HowBitcoinWork />} />
            <Route path="/blogs/howtochoosewallet" element={<HowToChooseWallet />} />
            <Route path="/blogs/amibeingscammed" element={<AmIBeingScammed />} />
            <Route path= "/Contact" element={<Contact />} />
            <Route path= "/About" element={<About />} />
            <Route path="/blogs/miningbitcoin" element={<Miningbitcoin />} />
            <Route path="/blogs/trumpusdt" element={<Trumpusdt />} />
            <Route path="/blogs/xrpusdt" element={<Xrpusdt />} />
            <Route path="/blogs/dogeusdt" element={<Dogeusdt />} />
            <Route path="/blogs/elonmuskspacex" element={<ElonMuskSpacex />} />
            <Route path="/blogs/elonmusktesla" element={<ElonMuskTesla />} />
            <Route path="/blogs/bigcompanyandbitcoin" element={<BigcompanyAndBitcoin />} />
            <Route path="/blogs/howtoopencryptowallet" element={<HowToOpenCryptoWallet />} />
            <Route path="/blogs/thebiggestcryptoexchange" element={<TheBiggestCryptoExchange />} />
            <Route path="/blogs/darkcrypto" element={<DarkCrypto />} />
            <Route path="/blogs/howtostartwithcrypto" element={<HowToStartWithCrypto />} />
<Route path="/blogs" element={<Blogs />} />
            <Route path="/bo" element={<BackOffice />} />
            <Route
              path="/bo/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
                        <Route
              path="/bo/privatetasks"
              element={
                <ProtectedRoute>
                  <PrivateTasks />
                </ProtectedRoute>
              }
            />
                        <Route
              path="/bo/Blogs"
              element={
                <ProtectedRoute>
                  <BlogsBo />
                </ProtectedRoute>
              }
            />
          </Routes>

          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
