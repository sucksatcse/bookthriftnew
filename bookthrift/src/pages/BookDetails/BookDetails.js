import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import styles from './BookDetails.module.css';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Failed to fetch book:", err));
  }, [id]);

  if (!book) return <p className={styles.loading}>লোড হচ্ছে...</p>;

  return (
    <div className={styles.bookDetails}>
      <div className={styles.imageSection}>
        <img src={book.image} alt={book.title} />
      </div>
      <div className={styles.infoSection}>
        <h2>{book.title}</h2>
        <p className={styles.author}>✍️ {book.author}</p>

        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => <FaStar key={i} />)}
          <span className={styles.staticRating}>4.5</span>
        </div>

        <p className={styles.price}>💸 {book.price} টাকা</p>

        <button className={styles.cartButton} onClick={() => addToCart(book)}>
          <FaShoppingCart /> Cart এ যোগ করুন
        </button>
      </div>
    </div>
  );
};

export default BookDetails;