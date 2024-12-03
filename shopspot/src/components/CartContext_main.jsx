import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 
  const [userId, setUserId] = useState(localStorage.getItem('userId') || ''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      console.error('User ID is missing. Please log in.');
      setError('User ID is missing.');
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(response.data.products || []); 
      setError(''); 
    } catch (error) {
      console.error('Error fetching cart:', error.response?.data || error.message);
      setError('Failed to fetch cart.');
    } finally {
      setLoading(false); 
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:5000/api/cart`, { userId, productId, quantity });
      setCart(response.data.products); 
      setError(''); 
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      setError('Failed to add product to cart.');
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/cart`, { userId, productId, quantity });
      setCart(response.data.products);
      setError('');
    } catch (error) {
      console.error('Error updating cart quantity:', error.response?.data || error.message);
      setError('Failed to update cart.');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      setCart(response.data.products);
      setError('');
    } catch (error) {
      console.error('Error removing product from cart:', error.response?.data || error.message);
      setError('Failed to remove product from cart.');
    } finally {
      setLoading(false);
    }
  };

  // Provide context values to the children
  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, error, loading, userId, setUserId }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
