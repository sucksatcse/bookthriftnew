// Home.js
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../../components/BookCard/BookCard';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import { FaBook, FaMoneyBill, FaBell, FaTruck } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then((res) => {
        // ✅ Show first 4 books
        setFeaturedBooks(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured books:", err);
        setLoading(false);
      });
  }, []);

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
          {loading ? (
            <p>লোড হচ্ছে...</p>
          ) : featuredBooks.length === 0 ? (
            <p>কোনো বই পাওয়া যায়নি</p>
          ) : (
            featuredBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))
          )}
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