// server/models/BookModel.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,          // Bangla title
  title_en: String,       // Romanized title (for English search)
  author: String,
  price: Number,
  image: String,
  stock: Number,
  category: String
});

export default mongoose.model("Book", bookSchema);