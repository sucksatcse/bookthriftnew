import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useRegister } from '../../hooks/useRegister';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();
  const { user, authReady } = useAuthContext();
  const { register, isLoading, error } = useRegister();

  const [data, setData] = useState({ name: '', email: '', contact: '', password: '' });
  const [errors, setErrors] = useState({});

  // 🚨 Redirect if already logged in
  useEffect(() => {
    if (authReady && user) navigate('/');
  }, [authReady, user, navigate]);

  const handleChange = (e) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const pwChecks = {
    length: data.password.length >= 8,
    upper: /[A-Z]/.test(data.password),
    lower: /[a-z]/.test(data.password),
    number: /\d/.test(data.password),
    symbol: /[^A-Za-z0-9]/.test(data.password),
  };
  const strong = Object.values(pwChecks).every(Boolean);

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'নাম লিখুন';
    if (!data.email.trim()) e.email = 'ইমেইল লিখুন';
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'সঠিক ইমেইল লিখুন';
    if (!data.contact.trim()) e.contact = 'যোগাযোগ নম্বর লিখুন';
    else if (!/^01\d{9}$/.test(data.contact)) e.contact = 'সঠিক মোবাইল নম্বর (01XXXXXXXXX) দিন';
    if (!data.password) e.password = 'পাসওয়ার্ড দিন';
    else if (!strong) e.password = 'শক্তিশালী পাসওয়ার্ড দিন';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    const res = await register(data);
    if (res.ok) navigate('/');
    // error auto-handled in hook
  };

  const Req = ({ ok, children }) => (
    <div style={{ color: ok ? '#16a34a' : '#b42318', fontSize: 14, lineHeight: 1.3 }}>
      • {children}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>রেজিস্টার</h1>

        <form onSubmit={handleSubmit} noValidate>
          <label className={styles.label}>
            নাম
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="আপনার নাম"
              value={data.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>

          <label className={styles.label}>
            ইমেইল
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={data.email}
              onChange={handleChange}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </label>

          <label className={styles.label}>
            যোগাযোগ
            <input
              className={styles.input}
              type="tel"
              name="contact"
              placeholder="01XXXXXXXXX"
              value={data.contact}
              onChange={handleChange}
            />
            {errors.contact && <span className={styles.error}>{errors.contact}</span>}
          </label>

          <label className={styles.label}>
            পাসওয়ার্ড
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="কমপক্ষে 8 অক্ষর, বড়/ছোট অক্ষর, নাম্বার ও সিম্বল"
              value={data.password}
              onChange={handleChange}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </label>

          <div className={styles.pwHints}>
            <Req ok={pwChecks.length}>৮+ অক্ষর</Req>
            <Req ok={pwChecks.upper}>বড় হাতের অক্ষর (A-Z)</Req>
            <Req ok={pwChecks.lower}>ছোট হাতের অক্ষর (a-z)</Req>
            <Req ok={pwChecks.number}>নাম্বার (0-9)</Req>
            <Req ok={pwChecks.symbol}>সিম্বল (!@#$…)</Req>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'রেজিস্টার হচ্ছে...' : 'রেজিস্টার'}
          </button>

          <p className={styles.muted}>
            ইতিমধ্যে অ্যাকাউন্ট আছে? <Link to="/login">লগইন</Link>
          </p>
        </form>
      </div>
    </div>
  );
}