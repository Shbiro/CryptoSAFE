import React from 'react';
import styles from './Blogs.module.css'; // CSS Modules

const BlogCard = ({ title, description, image }) => {
    return (
        <div className={styles.blogCard}> {/* שימוש נכון ב-CSS Modules */}
            <img src={image} alt={title} className={styles.blogImage} />
            <h2 className={styles.blogTitle}>{title}</h2>
            <p className={styles.blogDescription}>{description}</p>
        </div>
    );
};

export default BlogCard;
