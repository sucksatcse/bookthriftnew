import React from 'react';
import {
  FaHeart,
  FaExchangeAlt,
  FaShoppingCart,
  FaStar,
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import styles from './BookCard.module.css';

function BookCard({ book }) {
  const { addToCart } = useCart();

  /* book MUST have id, price (string or number) */
  return (
    <div className={styles.bookCard}>
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>
      <p className={styles.price}>{book.price} ৳</p>

      <div className={styles.bookActions}>
        <button>
          <FaHeart />
        </button>

        <button onClick={() => addToCart(book)} title="Cart এ যোগ করুন">
          <FaShoppingCart />
        </button>

        <button>
          <FaExchangeAlt />
        </button>
      </div>

      <div className={styles.rating}>
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
    </div>
  );
}

export default BookCard;