import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchBooks } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';
import styles from './SearchPage.module.css'; // optional custom styling

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    searchBooks(query)
      .then(res => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Search failed:", err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className={styles.searchPageWrapper}>
      <h2 className={styles.heading}>
         খুঁজছেন: "<span className={styles.query}>{query}</span>"
      </h2>

      {loading ? (
        <p className={styles.status}> খোঁজ চলছে...</p>
      ) : results.length === 0 ? (
        <p className={styles.status}> কোনো বই পাওয়া যায়নি!</p>
      ) : (
        <div className={styles.bookGrid}>
          {results.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;