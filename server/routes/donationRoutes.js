import express from 'express'
import requireAuth from '../middleware/requireAuth.js'
import { createDonation, getMyDonations } from '../controllers/donationController.js'

const router = express.Router()

// Protect all donation routes
router.use(requireAuth)

// Routes
router.post('/', createDonation)   // logged-in user can donate
router.get('/my', getMyDonations)  // logged-in user can see only their donations

export default router