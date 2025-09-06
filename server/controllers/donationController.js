import Donation from '../models/DonationModel.js'

// Create a donation for logged-in user
export const createDonation = async (req, res) => {
  const { bookTitle, amount } = req.body
  if (!bookTitle || !amount) {
    return res.status(400).json({ error: 'Book title and amount required' })
  }

  const parsedAmount = Number(amount)
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' })
  }

  try {
    const donation = await Donation.create({
      userId: req.user._id,
      name: req.user.name,
      email: req.user.email,
      bookTitle,
      amount: parsedAmount
    })
    res.status(201).json(donation)
  } catch (error) {
    console.error('Donation error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get donations of the logged-in user
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(donations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch donations' })
  }
}