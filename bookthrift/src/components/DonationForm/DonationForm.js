import React, { useState } from 'react';
import styles from './DonationForm.module.css';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // For now, just alert the data
    alert(`Thank you, ${formData.name}, for your donation of ${formData.amount} টাকা!`);
    // Reset form
    setFormData({ name: '', email: '', amount: '', message: '' });
  };

  return (
    <form className={styles.donationForm} onSubmit={handleSubmit}>
      <h2>দান ফর্ম</h2>

      <label htmlFor="name">নাম</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="আপনার নাম লিখুন"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">ইমেইল</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="আপনার ইমেইল লিখুন"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="amount">দান পরিমাণ</label>
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="টাকার পরিমাণ লিখুন"
        value={formData.amount}
        onChange={handleChange}
        required
        min="1"
      />

      <label htmlFor="message">বার্তা (ঐচ্ছিক)</label>
      <textarea
        id="message"
        name="message"
        placeholder="আপনার বার্তা লিখুন"
        value={formData.message}
        onChange={handleChange}
        rows="4"
      />

      <button type="submit">দান করুন</button>
    </form>
  );
};

export default DonationForm;