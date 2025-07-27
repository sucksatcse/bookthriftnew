import React from 'react';
import styles from './Contact.module.css';

function Contact() {
  return (
    <div className={styles.contactPage}>
      <h1>আমাদের সাথে যোগাযোগ করুন</h1>
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h2>যোগাযোগের তথ্য</h2>
          <p><strong>ঠিকানা:</strong> ১২৩ বই মার্কেট, বাংলাবাজার, ঢাকা</p>
          <p><strong>ফোন:</strong> +৮৮০ ১৭১২ ৩৪৫৬৭৮</p>
          <p><strong>ইমেইল:</strong> info@bookthrift.com</p>
          <p><strong>খোলার সময়:</strong> সকাল ৯টা - রাত ১০টা (প্রতিদিন)</p>
        </div>
        <div className={styles.contactForm}>
          <h2>বার্তা পাঠান</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">আপনার নাম</label>
              <input type="text" id="name" placeholder="আপনার নাম লিখুন" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">ইমেইল</label>
              <input type="email" id="email" placeholder="আপনার ইমেইল লিখুন" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">বিষয়</label>
              <input type="text" id="subject" placeholder="বিষয় লিখুন" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">বার্তা</label>
              <textarea id="message" rows="5" placeholder="আপনার বার্তা লিখুন"></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>বার্তা পাঠান</button>
          </form>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <h2>আমাদের অবস্থান</h2>
        <div className={styles.map}>
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.862415018827!2d90.3996143154316!3d23.75072288458838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sBangla%20Bazar%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;