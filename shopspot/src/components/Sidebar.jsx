import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import axios from 'axios';

function Sidebar({ onCategorySelect, categories }) {
  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isFilterOpen, setFilterOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Categories received in Sidebar:", categories); 
  }, [categories]);

  const toggleCategory = () => setCategoryOpen(!isCategoryOpen);
  const toggleFilter = () => setFilterOpen(!isFilterOpen);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Product Filters</h3>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title" onClick={toggleCategory}>
          <h4>Categories</h4>
          <span>{isCategoryOpen ? '-' : '+'}</span>
        </div>

        {isCategoryOpen && (
          <div className="sidebar-list">
            <ul>
              {isLoading ? (
                <li>Loading categories...</li>
              ) : error ? (
                <li>{error}</li>
              ) : categories.length > 0 ? (
                categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => onCategorySelect(category)}
                    className="category-item"
                  >
                    {category}
                  </li>
                ))
              ) : (
                <li>No categories available</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title" onClick={toggleFilter}>
          <h4>Filters</h4>
          <span>{isFilterOpen ? '-' : '+'}</span>
        </div>
        {isFilterOpen && (
          <div className="sidebar-list">
            <h5>Price Range</h5>
            <input type="range" min="0" max="1000" step="50" />

            <h5>Ratings</h5>
            <div className="rating">
              <input type="checkbox" id="4stars" />
              <label htmlFor="4stars">4 Stars & up</label>
              <br />
              <input type="checkbox" id="3stars" />
              <label htmlFor="3stars">3 Stars & up</label>
            </div>

            <h5>Brands</h5>
            <div className="brand">
              <input type="checkbox" id="nike" />
              <label htmlFor="nike">Nike</label>
              <br />
              <input type="checkbox" id="adidas" />
              <label htmlFor="adidas">Adidas</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
