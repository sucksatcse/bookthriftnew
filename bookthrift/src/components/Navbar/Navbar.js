import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { totalQty } = useCart();

  return (
    <header className={styles.header}>
      {/* ─── brand logo ─── */}
      <div className={styles.logo}>
        <FaBook className={styles.bookIcon} />
        <span className={styles.logoText}>বুক থ্রিফট</span>
      </div>

      {/* ─── main nav ─── */}
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
              end
            >
              হোম
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product-list"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              বই সমূহ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              যোগাযোগ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donation"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              দান করুন
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ─── search + icons ─── */}
      <div className={styles.searchCart}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="বই খুঁজুন..." />
          <button>
            <FaSearch />
          </button>
        </div>

        <div className={styles.userActions}>
          <Link to="/cart" className={styles.cartBtn} aria-label="Cart">
            <FaShoppingCart />
            {totalQty > 0 && <span className={styles.badge}>{totalQty}</span>}
          </Link>

          <NavLink to="/login" className={styles.userButton}>
            <FaUser />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;