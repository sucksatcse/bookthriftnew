import React, { useState } from 'react';
import styles from './ProductList.module.css';
import BookCard from '../../components/BookCard/BookCard';

// Dummy books with categories
const allBooks = [
  { id: 1, title: "লাল সালু", author: "সৈয়দ ওয়ালীউল্লাহ", price: "২৫০ টাকা", image: "https://covers.openlibrary.org/b/id/10523338-L.jpg", category: "উপন্যাস" },
  { id: 2, title: "পদ্মা নদীর মাঝি", author: "মানিক বন্দ্যোপাধ্যায়", price: "৩০০ টাকা", image: "https://covers.openlibrary.org/b/id/1090458-L.jpg", category: "উপন্যাস" },
  { id: 3, title: "হাজার বছর ধরে", author: "জহির রায়হান", price: "২০০ টাকা", image: "https://covers.openlibrary.org/b/id/10523336-L.jpg", category: "উপন্যাস" },
  { id: 4, title: "কবি", author: "রবীন্দ্রনাথ ঠাকুর", price: "১৮০ টাকা", image: "https://covers.openlibrary.org/b/id/10523337-L.jpg", category: "কবিতা" },
  { id: 5, title: "চাঁদের পাহাড়", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153223-L.jpg", category: "উপন্যাস" },
  { id: 6, title: "শঙ্খনীল কারাগার", author: "হুমায়ূন আহমেদ", price: "২১০ টাকা", image: "https://covers.openlibrary.org/b/id/11153224-L.jpg", category: "ছোটগল্প" },
  { id: 7, title: "দেবদাস", author: "শরৎচন্দ্র চট্টোপাধ্যায়", price: "২৩০ টাকা", image: "https://covers.openlibrary.org/b/id/11153225-L.jpg", category: "উপন্যাস" },
  { id: 8, title: "পুতুলনাচের ইতিকথা", author: "সৈয়দ ওয়ালীউল্লাহ", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153226-L.jpg", category: "উপন্যাস" },
  { id: 9, title: "অপরাজিত", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়", price: "২১০ টাকা", image: "https://covers.openlibrary.org/b/id/11153227-L.jpg", category: "উপন্যাস" },
  { id: 10, title: "গোরা", author: "রবীন্দ্রনাথ ঠাকুর", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153228-L.jpg", category: "উপন্যাস" },
  { id: 11, title: "শেষের কবিতা", author: "রবীন্দ্রনাথ ঠাকুর", price: "২৩০ টাকা", image: "https://covers.openlibrary.org/b/id/11153229-L.jpg", category: "কবিতা" },
  { id: 12, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153230-L.jpg", category: "উপন্যাস" },
  { id: 13, title: "মধ্যরাত্রির সৌরভ", author: "হুমায়ূন আহমেদ", price: "২১০ টাকা", image: "https://covers.openlibrary.org/b/id/11153231-L.jpg", category: "ছোটগল্প" },
  { id: 14, title: "অচিনপুর", author: "হুমায়ূন আহমেদ", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153232-L.jpg", category: "ছোটগল্প" },
  { id: 15, title: "দুই দুয়ারী", author: "হুমায়ূন আহমেদ", price: "২৩০ টাকা", image: "https://covers.openlibrary.org/b/id/11153233-L.jpg", category: "ছোটগল্প" },
  { id: 16, title: "রবীন্দ্রনাথের ছোটগল্প", author: "রবীন্দ্রনাথ ঠাকুর", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153234-L.jpg", category: "ছোটগল্প" },
  { id: 17, title: "অগ্নিবীণা", author: "কাজী নজরুল ইসলাম", price: "২১০ টাকা", image: "https://covers.openlibrary.org/b/id/11153235-L.jpg", category: "কবিতা" },
  { id: 18, title: "দুই বোন", author: "হুমায়ূন আহমেদ", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11253236-L.jpg", category: "উপন্যাস" },
  { id: 19, title: "কৃষ্ণকান্তের উইল", author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়", price: "২৩০ টাকা", image: "https://covers.openlibrary.org/b/id/11153237-L.jpg", category: "উপন্যাস" },
  { id: 20, title: "চোখের বালি", author: "রবীন্দ্রনাথ ঠাকুর", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153238-L.jpg", category: "উপন্যাস" },
  { id: 21, title: "বিজ্ঞান ও প্রযুক্তি", author: "মুহম্মদ জাফর ইকবাল", price: "২২০ টাকা", image: "https://covers.openlibrary.org/b/id/11153239-L.jpg", category: "বিজ্ঞান" },
  { id: 22, title: "রহস্য উপন্যাস", author: "সুনীল গঙ্গোপাধ্যায়", price: "২৩০ টাকা", image: "https://covers.openlibrary.org/b/id/11153240-L.jpg", category: "উপন্যাস" }
];

const categories = ["সব", "উপন্যাস", "কবিতা", "ছোটগল্প", "বিজ্ঞান"];
const BOOKS_PER_PAGE = 10;

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("সব");

  // Filter books by category
  const filteredBooks =
    selectedCategory === "সব"
      ? allBooks
      : allBooks.filter(book => book.category === selectedCategory);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const startIdx = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIdx = startIdx + BOOKS_PER_PAGE;
  const booksToShow = filteredBooks.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.productListPage}>
      <h1 className={styles.heading}>সব বই</h1>
      <div className={styles.categoryFilter}>
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? styles.activeCategory : ''}
            onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.bookGrid}>
        {booksToShow.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={currentPage === idx + 1 ? styles.activePage : ''}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductList;