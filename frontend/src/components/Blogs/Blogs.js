import React from 'react';
import Header from '../Header/Header';
import BlogGallery from './BlogGallery';
import './Blogs.css';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import Footer from '../Footer/Footer'
const Blogs = () => {
    return (
        <div className='Blogs'>
            <Header />

            {/* ✅ תמונה עם עיצוב משופר */}
            <div className="blog-image-container">
                <img 
                    src="https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
                    alt="השקעות קריפטו"
                    className="blog-header-image"
                />
            </div>

            {/* ✅ כותרת ראשית מושכת */}
            <h1>עולם הקריפטו: גלה את ההשקעות הגדולות של המחר</h1>

            {/* ✅ גלריית הבלוגים */}
            <BlogGallery />
            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default Blogs;
