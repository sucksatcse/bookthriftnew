// server/models/BookModel.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,      // ✅ store number only
  image: String,
  stock: Number,
  category: String     // ✅ for filtering
});

export default mongoose.model("Book", bookSchema);