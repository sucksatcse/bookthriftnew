// server/routes/bookRoutes.js
import express from "express";
import Book from "../models/BookModel.js";
import { getAllBooks, updateStock } from "../controllers/bookController.js";

const router = express.Router();

//  Search books by Bangla or English title_en
router.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ message: "No search query provided." });

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { title_en: { $regex: query, $options: "i" } }
      ]
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get all books
router.get("/", getAllBooks);

//  Update stock of specific book
router.patch("/:id/stock", updateStock);

//  Get a single book by ID
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