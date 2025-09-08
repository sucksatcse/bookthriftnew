const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String
  },
  genre: {
    type: String
  },
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Reserved'],
    default: 'Available'
  }
}, {
  timestamps: true
});

// Create index for search functionality
bookSchema.index({ title: 'text', author: 'text', genre: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);