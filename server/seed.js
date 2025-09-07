// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/BookModel.js';

dotenv.config();

// Dummy books data
const books = [
  {
    title: "লাল সালু",
    author: "সৈয়দ ওয়ালীউল্লাহ",
    price: 250,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1590783128i/53632001.jpg",
    category: "উপন্যাস",
    stock: 5
  },
  {
    title: "পদ্মা নদীর মাঝি",
    author: "মানিক বন্দ্যোপাধ্যায়",
    price: 300,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1423324946i/23519023.jpg",
    category: "উপন্যাস",
    stock: 5
  },
  {
    title: "হাজার বছর ধরে",
    author: "জহির রায়হান",
    price: 200,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1414937402i/15824406.jpg",
    category: "উপন্যাস",
    stock: 5
  },
  {
    title: "কবি",
    author: "হুমায়ূন আহমেদ",
    price: 180,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1363523207i/3128423.jpg",
    category: "কবিতা",
    stock: 5
  },
  {
    title: "চাঁদের পাহাড়",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    price: 220,
    image: "https://covers.openlibrary.org/b/id/11153223-L.jpg",
    category: "উপন্যাস",
    stock: 5
  },

  {
    title: "দেবদাস",
    author: "শরৎচন্দ্র চট্টোপাধ্যায়",
    price: 230,
    image: "https://covers.openlibrary.org/b/id/11153225-L.jpg",
    category: "উপন্যাস",
    stock: 5
  },
  {
    title: "পুতুলনাচের ইতিকথা",
    author: "সৈয়দ ওয়ালীউল্লাহ",
    price: 220,
    image: "https://covers.openlibrary.org/b/id/11153226-L.jpg",
    category: "উপন্যাস",
    stock: 5
  },
  

  {
    title: "শেষের কবিতা",
    author: "রবীন্দ্রনাথ ঠাকুর",
    price: 230,
    image: "https://covers.openlibrary.org/b/id/11153229-L.jpg",
    category: "কবিতা",
    stock: 5
  },
  {
    title: "পথের পাঁচালী",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    price: 220,
    image: "https://covers.openlibrary.org/b/id/11153230-L.jpg",
    category: "উপন্যাস",
    stock: 5
  },


  {
    title: "রবীন্দ্রনাথের ছোটগল্প",
    author: "রবীন্দ্রনাথ ঠাকুর",
    price: 220,
    image: "https://covers.openlibrary.org/b/id/11153234-L.jpg",
    category: "ছোটগল্প",
    stock: 5
  },
  {
    title: "অগ্নিবীণা",
    author: "কাজী নজরুল ইসলাম",
    price: 210,
    image: "https://covers.openlibrary.org/b/id/11153235-L.jpg",
    category: "কবিতা",
    stock: 5
  },
  
  {
    title: "কৃষ্ণকান্তের উইল",
    author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
    price: 230,
    image: "https://covers.openlibrary.org/b/id/11153237-L.jpg",
    category: "উপন্যাস",
    stock: 5
  },
  {
    title: "চোখের বালি",
    author: "রবীন্দ্রনাথ ঠাকুর",
    price: 220,
    image: "https://covers.openlibrary.org/b/id/11153238-L.jpg",
    category: "উপন্যাস",
    stock: 5
  },
  {
    title: "বিজ্ঞান ও প্রযুক্তি",
    author: "মুহম্মদ জাফর ইকবাল",
    price: 220,
    image: "https://covers.openlibrary.org/b/id/11153239-L.jpg",
    category: "বিজ্ঞান",
    stock: 5
  },
  {
    title: "রহস্য উপন্যাস",
    author: "সুনীল গঙ্গোপাধ্যায়",
    price: 230,
    image: "https://covers.openlibrary.org/b/id/11153240-L.jpg",
    category: "উপন্যাস",
    stock: 5
  },
];

// Connect and insert
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("✅ MongoDB Connected. Seeding data...");

    await Book.deleteMany({}); // clear existing data
    await Book.insertMany(books); // insert dummy books

    console.log("✅ Seeding complete ✅");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection failed:", err);
    process.exit(1);
  });