import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useCart } from './CartContext_main';
import './Shop.css';
import { useNavigate } from 'react-router-dom'; 
function Shop() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data.data); 
        if (response.data.data.length > 0) {
          setSelectedCategory(response.data.data[0]); 
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProducts = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${selectedCategory}`);
        setProducts(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    addProductToCartBackend(product);
  };
  
  const addProductToCartBackend = async (product) => {
    try {
      console.log('Adding product to cart:', product); 
      const userId = localStorage.getItem('userId');  
      console.log('UserId:', userId);  
  
      const response = await axios.post('http://localhost:5000/api/cart_main', {
        userId: userId, 
        productId: product._id,  
        quantity: 1,  
      });
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="shop-container">
      <Sidebar onCategorySelect={handleCategorySelect} categories={categories} />
      <div className="shop-content">
        <h1>{selectedCategory ? selectedCategory : "Please select a category"}</h1>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>{product.description}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
