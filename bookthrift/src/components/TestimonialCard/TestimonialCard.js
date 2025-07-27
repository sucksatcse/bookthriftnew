import React from 'react';
import styles from './TestimonialCard.module.css';

function TestimonialCard({ text, customer }) {
  return (
    <div className={styles.testimonialCard}>
      <p>"{text}"</p>
      <p className={styles.customer}>- {customer}</p>
    </div>
  );
}

export default TestimonialCard;