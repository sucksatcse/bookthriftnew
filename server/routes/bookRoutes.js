// server/routes/bookRoutes.js
import express from "express";
import { getAllBooks, updateStock } from "../controllers/bookController.js";
import Book from "../models/BookModel.js"; // ✅ Add this

const router = express.Router();

router.get("/", getAllBooks);
router.patch("/:id/stock", updateStock);

// ✅ Added route to get one book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;