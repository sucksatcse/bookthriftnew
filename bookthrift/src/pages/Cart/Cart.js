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
          <div key={b._id || b.id} className={styles.row}>
            <div className={styles.book}>
              <img src={b.image} alt={b.title} />
              <div>
                <h4>{b.title}</h4>
                <p className={styles.author}>{b.author}</p>
              </div>
            </div>

            <div className={styles.qty}>
              {/* ➖ Minus button */}
              <button
                onClick={() => dec(b._id || b.id)}
                aria-label="minus"
                disabled={b.qty <= 1}
              >
                <FaMinus />
              </button>

              <span>{b.qty}</span>

              {/* ➕ Plus button with stock check */}
              <button
                onClick={() => {
                  if (b.qty >= b.stock) {
                    alert("স্টকে অতিরিক্ত কপি যোগ করা যাচ্ছে না");
                  } else {
                    inc(b._id || b.id);
                  }
                }}
                aria-label="plus"
              >
                <FaPlus />
              </button>
            </div>

            {/* 💰 Price Display */}
            <div className={styles.price}>
              {(parseFloat(b.price) * b.qty).toFixed(2)} ৳
            </div>

            {/* 🗑 Remove Button */}
            <button
              className={styles.remove}
              onClick={() => removeItem(b._id || b.id)}
              aria-label="remove"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Footer: Total & Checkout */}
      <div className={styles.footer}>
        <div className={styles.total}>
          মোট: <span>{totalPrice.toFixed(2)} ৳</span>
        </div>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </section>
  );
}