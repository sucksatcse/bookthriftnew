import React from 'react';
import {
  FaHeart,
  FaExchangeAlt,
  FaShoppingCart,
  FaStar,
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import styles from './BookCard.module.css';
import { Link } from 'react-router-dom'; // ✅ NEW

function BookCard({ book }) {
  const { items, addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className={styles.bookCard}>
      <Link to={`/books/${book._id || book.id}`}>
        <img src={book.image} alt={book.title} />
      </Link>

      <h3>{book.title}</h3>

      <p className={styles.author}>{book.author}</p>
      <p className={styles.price}>{book.price} ৳</p>

      <div className={styles.bookActions}>
        <button>
          <FaHeart />
        </button>

        <button onClick={handleAddToCart} title="Cart এ যোগ করুন">
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