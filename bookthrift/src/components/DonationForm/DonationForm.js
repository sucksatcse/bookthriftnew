import React, { useState } from "react";
import API from "../../services/api";

const DonationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookTitle: "",
    amount: "", // added amount field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      alert("Please enter a valid donation amount greater than 0.");
      return;
    }

    try {
      // Convert amount to number
      const payload = { ...formData, amount: Number(formData.amount) };

      await API.post("/donations", payload);
      alert("✅ Donation submitted successfully!");

      setFormData({ name: "", email: "", bookTitle: "", amount: "" }); // reset form
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Donation submission failed:", error);
      alert("❌ Failed to submit donation");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="text"
        name="bookTitle"
        placeholder="Book Title"
        value={formData.bookTitle}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Donation Amount"
        value={formData.amount}
        onChange={handleChange}
        style={styles.input}
        required
        min="1"
      />
      <button type="submit" style={styles.button}>Donate</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "auto",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DonationForm;
