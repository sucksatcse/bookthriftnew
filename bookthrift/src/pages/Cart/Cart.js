import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

export default function Cart() {
  const { items, inc, dec, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h2>আপনার কার্ট খালি</h2>
        <Link to="/product-list" className={styles.backBtn}>
          বইসমূহ দেখুন
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.cartWrapper}>
      <h2>আমার কার্ট</h2>

      <div className={styles.table}>
        {items.map((b) => (
          <div key={b.id} className={styles.row}>
            <div className={styles.book}>
              <img src={b.image} alt={b.title} />
              <div>
                <h4>{b.title}</h4>
                <p className={styles.author}>{b.author}</p>
              </div>
            </div>

            <div className={styles.qty}>
              <button onClick={() => dec(b.id)} aria-label="minus">
                <FaMinus />
              </button>
              <span>{b.qty}</span>
              <button onClick={() => inc(b.id)} aria-label="plus">
                <FaPlus />
              </button>
            </div>

            <div className={styles.price}>
              {(parseFloat(b.price) * b.qty).toFixed(2)} ৳
            </div>

            <button
              className={styles.remove}
              onClick={() => removeItem(b.id)}
              aria-label="remove"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          মোট: <span>{totalPrice.toFixed(2)} ৳</span>
        </div>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </section>
  );
}