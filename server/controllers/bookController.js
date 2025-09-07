// server/controllers/bookController.js
import Book from "../models/BookModel.js";

// Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a book's stock on cart update/checkout
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Not found" });

    if (book.stock < qty) {
      return res.status(400).json({ message: "No stock left!" });
    }

    book.stock -= qty;
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};