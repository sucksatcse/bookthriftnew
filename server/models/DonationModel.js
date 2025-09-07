import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // links donation to a specific user
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookTitle: { type: String, required: true },
  amount: { type: Number, required: true, min: 1 },
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;