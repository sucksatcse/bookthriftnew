// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import styles from './Navbar.module.css';

function Navbar() {
  const { totalQty } = useCart();
  const { user, authReady } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const firstName =
    user?.name ? user.name.split(' ')[0] : (user?.email || '').split('@')[0];

  return (
    <header className={styles.header}>
      {/* brand logo */}
      <div className={styles.logo}>
        <FaBook className={styles.bookIcon} />
        <span className={styles.logoText}>বুক থ্রিফট</span>
      </div>

      {/* main nav */}
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')} end>
              হোম
            </NavLink>
          </li>
          <li>
            <NavLink to="/product-list" className={({ isActive }) => (isActive ? styles.active : '')}>
              বই সমূহ
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : '')}>
              যোগাযোগ
            </NavLink>
          </li>
          <li>
            <NavLink to="/donation" className={({ isActive }) => (isActive ? styles.active : '')}>
              দান করুন
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* search + cart + auth */}
      <div className={styles.searchCart}>
        {/* 🔍 Search */}
        <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="বই খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        {/* 🛒 Cart & Auth */}
        <div className={styles.userActions}>
          <Link to="/cart" className={styles.cartBtn} aria-label="Cart">
            <FaShoppingCart />
            {totalQty > 0 && <span className={styles.badge}>{totalQty}</span>}
          </Link>

          {!authReady ? null : user ? (
            <>
              <span className={styles.userBadge} title={user?.email}>
                <FaUser style={{ marginRight: 6 }} />
                {firstName}
              </span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <FaSignOutAlt />
                <span className={styles.logoutText}>লগআউট</span>
              </button>
            </>
          ) : (
            <>
              <Link className={styles.loginLink} to="/login">
                লগইন
              </Link>
              <Link className={styles.registerLink} to="/register">
                রেজিস্টার
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;