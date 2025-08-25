import React from "react";
import DonationForm from '../../components/DonationForm/DonationForm';



const Donation = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 Donate a Book</h2>
      <p style={styles.text}>
        Fill out the form below to donate your book and help others discover it.
      </p>
      <DonationForm />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "20px",
  },
};

export default Donation;