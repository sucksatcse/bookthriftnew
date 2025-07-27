import React from 'react';
import { FaHeart, FaExchangeAlt, FaShoppingCart, FaStar } from 'react-icons/fa';
import styles from './BookCard.module.css';

function BookCard({ book }) {
  return (
    <div className={styles.bookCard}>
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>
      <p className={styles.price}>{book.price}</p>
      <div className={styles.bookActions}>
        <button><FaHeart /></button>
        <button><FaShoppingCart /></button>
        <button><FaExchangeAlt /></button>
      </div>
      <div className={styles.rating}>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </div>
  );
}

export default BookCard;