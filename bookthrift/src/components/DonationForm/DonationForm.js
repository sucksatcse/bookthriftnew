import React, { useState } from "react";
import API from "../../services/api";

const DonationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookTitle: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      alert("⚠️ দয়া করে একটি বৈধ অনুদানের পরিমাণ লিখুন (১ বা তার বেশি)।");
      return;
    }

    try {
      const payload = { ...formData, amount: Number(formData.amount) };
      await API.post("/donations", payload);
      alert("✅ অনুদান সফলভাবে জমা হয়েছে!");

      setFormData({ name: "", email: "", bookTitle: "", amount: "" });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Donation submission failed:", error);
      alert("❌ অনুদান জমা দেওয়া যায়নি!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="আপনার নাম"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="আপনার ইমেইল"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="text"
        name="bookTitle"
        placeholder="বইয়ের নাম"
        value={formData.bookTitle}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="অনুদানের পরিমাণ"
        value={formData.amount}
        onChange={handleChange}
        style={styles.input}
        required
        min="1"
      />
      <button type="submit" style={styles.button}>অনুদান দিন</button>
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
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default DonationForm;