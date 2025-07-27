import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>বুক থ্রিফট</h3>
          <p>বাংলা বইয়ের সবচেয়ে বড় অনলাইন মার্কেটপ্লেস</p>
          <div className={styles.socialIcons}>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>লিংক</h3>
          <ul>
            <li><a href="#">হোম</a></li>
            <li><a href="#">বই সমূহ</a></li>
            <li><a href="#">বিক্রয়</a></li>
            <li><a href="#">যোগাযোগ</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>সেবা</h3>
          <ul>
             <li><a href="/donation">দান করুন</a></li> 
            <li><a href="#">বই ক্রয়</a></li>
            <li><a href="#">বই বিক্রয়</a></li>
            <li><a href="#">বই বিনিময়</a></li>
            <li><a href="#">ই-বুক</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>নিউজলেটার</h3>
          <p>নতুন বই সম্পর্কে জানতে সাবস্ক্রাইব করুন</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="আপনার ইমেইল" />
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