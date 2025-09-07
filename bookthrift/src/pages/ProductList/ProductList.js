import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import BookCard from '../../components/BookCard/BookCard';
import axios from 'axios';

const categories = ['সব', 'উপন্যাস', 'কবিতা', 'ছোটগল্প', 'বিজ্ঞান'];
const BOOKS_PER_PAGE = 12;

export default function ProductList() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/books')
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books: ', err);
        setLoading(false);
      });
  }, []);

  const filteredBooks =
    selectedCategory === 'সব'
      ? books
      : books.filter((book) => book.category === selectedCategory);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const startIdx = (currentPage - 1) * BOOKS_PER_PAGE;
  const booksToShow = filteredBooks.slice(startIdx, startIdx + BOOKS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.heading}>সকল বই</h1>

      {/* Category Filters */}
      <div className={styles.categoryFilter}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={
              selectedCategory === cat
                ? styles.activeCategory
                : styles.categoryButton
            }
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      {loading ? (
        <p className={styles.loadingText}>📦 লোড হচ্ছে...</p>
      ) : booksToShow.length === 0 ? (
        <p className={styles.errorText}>এই বিভাগে কোনো বই পাওয়া যায়নি।</p>
      ) : (
        <div className={styles.bookGrid}>
          {booksToShow.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={
              currentPage === idx + 1
                ? styles.activePage
                : styles.paginationButton
            }
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}