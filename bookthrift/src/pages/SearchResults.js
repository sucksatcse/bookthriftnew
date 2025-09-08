import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';

const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/search?${queryParams.toString()}`);
        setBooks(response.data.books);
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          total: response.data.total
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  if (loading) return <div className="loading">Loading search results...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-results">
      <h2>Search Results ({pagination.total} books found)</h2>
      
      {books.length === 0 ? (
        <div className="no-results">
          <p>No books found matching your criteria.</p>
          <p>Try adjusting your search filters.</p>
        </div>
      ) : (
        <>
          <div className="books-grid">
            {books.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          
          {/* Pagination controls */}
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                Previous
              </button>
              
              <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
              
              <button 
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;