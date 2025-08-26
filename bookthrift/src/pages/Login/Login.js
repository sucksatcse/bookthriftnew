import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.email.trim()) e.email = 'ইমেইল লিখুন';
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = 'সঠিক ইমেইল লিখুন';
    if (!data.password) e.password = 'পাসওয়ার্ড দিন';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    /* backend later … */
    localStorage.setItem('demoUser', JSON.stringify({ email: data.email }));
    navigate('/'); // pretend-login, then go home
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>লগইন</h1>

        <form onSubmit={handleSubmit} noValidate>
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
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>

          <label className={styles.label}>
            পাসওয়ার্ড
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="********"
              value={data.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </label>

          <button type="submit" className={styles.submit}>
            লগইন
          </button>

          <p className={styles.muted}>
            অ্যাকাউন্ট নেই? <Link to="#">রেজিস্টার</Link>
          </p>
        </form>
      </div>
    </div>
  );
}