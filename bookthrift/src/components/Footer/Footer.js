import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* Brand + Socials */}
        <div className={styles.footerSection}>
          <h3>বুক থ্রিফট</h3>
          <p>বাংলা বইয়ের সবচেয়ে বড় অনলাইন মার্কেটপ্লেস</p>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Links column */}
        <div className={styles.footerSection}>
          <h3>লিংক</h3>
          <ul>
            <li><Link to="/">হোম</Link></li>
            <li><Link to="/product-list">বই সমূহ</Link></li>
            <li><Link to="/contact">যোগাযোগ</Link></li>
          </ul>
        </div>

        {/* Services column */}
        <div className={styles.footerSection}>
          <h3>সেবা</h3>
          <ul>
            <li><Link to="/donation">দান করুন</Link></li>
            <li><Link to="/product-list">বই ক্রয়</Link></li>
            <li><a href="https://example.com/ebooks" target="_blank" rel="noopener noreferrer">ই-বুক</a></li>
          </ul>
        </div>

        {/* Newsletter column */}
        <div className={styles.footerSection}>
          <h3>নিউজলেটার</h3>
          <p>নতুন বই সম্পর্কে জানতে সাবস্ক্রাইব করুন</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="আপনার ইমেইল" required />
            <button type="submit">সাবস্ক্রাইব</button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} বুক থ্রিফট - সর্বস্বত্ব সংরক্ষিত</p>
      </div>
    </footer>
  );
}

export default Footer;