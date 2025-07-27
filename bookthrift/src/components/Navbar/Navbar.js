import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <FaBook className={styles.bookIcon} />
        <span className={styles.logoText}>বুক থ্রিফট</span>
      </div>
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
      <div className={styles.searchCart}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="বই খুঁজুন..." />
          <button><FaSearch /></button>
        </div>
        <div className={styles.userActions}>
          <button><FaShoppingCart /></button>
          <button><FaUser /></button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;