import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    condition: '',
    minPrice: '',
    maxPrice: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query string
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.condition) params.append('condition', filters.condition);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    
    // Navigate to search results page
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search for books by title, author, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
          <button 
            type="button" 
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle"
          >
            Filters
          </button>
        </div>
        
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label>Genre:</label>
              <select 
                value={filters.genre} 
                onChange={(e) => setFilters({...filters, genre: e.target.value})}
              >
                <option value="">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                {/* Add more genres as needed */}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Condition:</label>
              <select 
                value={filters.condition} 
                onChange={(e) => setFilters({...filters, condition: e.target.value})}
              >
                <option value="">Any Condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Price Range:</label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;