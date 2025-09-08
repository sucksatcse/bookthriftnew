const express = require('express');
const router = express.Router();
const { searchBooks, getBookById } = require('../controllers/searchController');

// Search route
router.get('/search', searchBooks);

// Get single book details
router.get('/books/:id', getBookById);

module.exports = router;