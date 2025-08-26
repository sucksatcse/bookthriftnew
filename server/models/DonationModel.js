import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  bookTitle: { type: String, required: true },  // <-- Add this
  amount:    { type: Number, required: true, min: 1 },
  message:   { type: String }
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
