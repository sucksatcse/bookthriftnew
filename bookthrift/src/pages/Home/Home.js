import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard/BookCard';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import { FaBook, FaMoneyBill, FaBell, FaTruck } from 'react-icons/fa';

const featuredBooks = [
  {
    id: 1,
    title: "লাল সালু",
    author: "সৈয়দ ওয়ালীউল্লাহ",
    price: "২৫০ টাকা",
    image: "https://covers.openlibrary.org/b/id/10523338-L.jpg"
  },
  {
    id: 2,
    title: "পদ্মা নদীর মাঝি",
    author: "মানিক বন্দ্যোপাধ্যায়",
    price: "৩০০ টাকা",
    image: "https://covers.openlibrary.org/b/id/1090458-L.jpg"
  },
  {
    id: 3,
    title: "হাজার বছর ধরে",
    author: "জহির রায়হান",
    price: "২০০ টাকা",
    image: "https://covers.openlibrary.org/b/id/10523336-L.jpg"
  },
  {
    id: 4,
    title: "কবি",
    author: "রবীন্দ্রনাথ ঠাকুর",
    price: "১৮০ টাকা",
    image: "https://covers.openlibrary.org/b/id/10523337-L.jpg"
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>আপনার পছন্দের বই খুঁজুন</h1>
          <p>বাংলা সাহিত্যের সেরা বইগুলির সংগ্রহ</p>
          <button
            className={styles.ctaButton}
            onClick={() => navigate('/product-list')}
          >
            এখনই ব্রাউজ করুন
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>আমাদের সেবাসমূহ</h2>
        <div className={styles.featureGrid}>
          <FeatureCard icon={<FaBook />} title="বাছাইকৃত বই" description="সেরা বাংলা বইয়ের সংগ্রহ" />
          <FeatureCard icon={<FaMoneyBill />} title="ক্রয়/বিক্রয়/বিনিময়" description="বই ক্রয়, বিক্রয় বা বিনিময় করুন" />
          <FeatureCard icon={<FaBell />} title="নোটিফিকেশন" description="পছন্দের বইয়ের আপডেট পান" />
          <FeatureCard icon={<FaTruck />} title="দ্রুত ডেলিভারি" description="সারা দেশে ডেলিভারি" />
        </div>
      </section>

      {/* Featured Books */}
      <section className={styles.featuredBooks}>
        <h2>জনপ্রিয় বইসমূহ</h2>
        <div className={styles.bookGrid}>
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2>গ্রাহকদের মতামত</h2>
        <div className={styles.testimonialGrid}>
          <TestimonialCard text="অসাধারণ বইয়ের সংগ্রহ এবং দ্রুত ডেলিভারি সেবা!" customer="রহিমা আক্তার" />
          <TestimonialCard text="পুরাতন বই বিনিময়ের সুবিধা খুবই ভালো ধারণা।" customer="করিম উদ্দিন" />
        </div>
      </section>
    </div>
  );
}

export default Home;