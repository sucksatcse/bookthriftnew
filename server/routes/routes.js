import express from "express";
import Donation from "../models/DonationModel.js";

const router = express.Router();

// Donation route
router.post("/donations", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: "Donation saved successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
