import express from 'express';
import Donation from '../models/DonationModel.js';

const router = express.Router();

// POST donation
router.post('/', async (req, res) => {
  try {
    const { name, email, bookTitle, amount } = req.body;

    if (!name || !email || !bookTitle || amount === undefined) {
      return res.status(400).json({ message: 'All fields (name, email, bookTitle, amount) are required' });
    }

    // Optionally, parse amount if sent as string
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const donation = new Donation({ name, email, bookTitle, amount: parsedAmount });
    await donation.save();

    res.status(201).json({ message: 'Donation saved successfully', donation });
  } catch (error) {
    console.error('Donation save error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

export default router;
