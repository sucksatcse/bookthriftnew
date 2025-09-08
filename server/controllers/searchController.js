const Book = require('../models/Book');

// GET /api/search?q=query&genre=genre&condition=condition&minPrice=min&maxPrice=max
exports.searchBooks = async (req, res) => {
  try {
    const { q, genre, condition, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
    // Build the filter object
    let filter = { status: 'Available' };
    
    // Text search
    if (q) {
      filter.$text = { $search: q };
    }
    
    // Genre filter
    if (genre) {
      filter.genre = new RegExp(genre, 'i');
    }
    
    // Condition filter
    if (condition) {
      filter.condition = condition;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Execute query with pagination
    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('sellerId', 'name email');
    
    // Get total count for pagination
    const total = await Book.countDocuments(filter);
    
    // Return response
    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/books/:id - Get single book details
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('sellerId', 'name email rating');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};