import React, { useEffect, useState } from "react";
import DonationForm from '../../components/DonationForm/DonationForm';
import API from '../../services/api';
import { useAuthContext } from '../../hooks/useAuthContext';

const Donation = () => {
  const { user } = useAuthContext();
  const [myDonations, setMyDonations] = useState([]);

  const fetchMyDonations = async () => {
    try {
      const res = await API.get('/donations/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
      });
      setMyDonations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Only fetch when user is available
  useEffect(() => {
    if (user) {
      fetchMyDonations();
    }
  }, [user]);

  return (
    <div style={styles.container}>
      {/* Left form */}
      <div style={styles.left}>
        <h2 style={styles.heading}>📚 Donate a Book</h2>
        <p style={styles.text}>
          Fill out the form below to donate your book and help others discover it.
        </p>
        <DonationForm onSuccess={fetchMyDonations} />
      </div>

      {/* Right panel: logged-in user’s own donations */}
      <div style={styles.right}>
        <h3>আপনার দেওয়া দান</h3>
        {myDonations.length === 0 && <p>আপনি এখনও কোন বই দান করেননি।</p>}

        <ul>
          {myDonations.map(d => (
            <li key={d._id} style={styles.item}>
              <strong>{d.bookTitle}</strong> — {d.amount} কপি
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    gap: "30px"
  },
  left: { flex: 1 },
  right: {
    flex: 1,
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    background: "#f9f9f9"
  },
  heading: { fontSize: "24px", marginBottom: "10px" },
  text: { fontSize: "16px", marginBottom: "20px" },
  item: { marginBottom: "8px", textAlign: "left" }
};

export default Donation;