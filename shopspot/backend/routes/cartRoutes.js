const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

module.exports = (app) => {
  /**
   * Add a product to the cart
   */
  app.post('/api/cart', async (req, res) => {
    const { sessionId, productId, quantity } = req.body;

    // Validate input
    if (!sessionId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid or missing required fields' });
    }

    try {
      // Find or create cart for the session
      let cart = await Cart.findOneAndUpdate(
        { sessionId },
        { $setOnInsert: { sessionId } },
        { new: true, upsert: true } // Create a new cart if one doesn't exist
      );

      // Check if the product is already in the cart
      const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

      if (productIndex > -1) {
        // If product exists, update its quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Otherwise, add a new product
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      res.json({ success: true, data: cart, message: 'Product added to cart successfully' });
    } catch (err) {
      console.error('Error adding product to cart:', err);
      res.status(500).json({ success: false, message: 'Error adding product to cart', error: err.message });
    }
  });

  /**
   * Fetch a user's cart
   */
  // Example backend route for getting the cart based on sessionId
app.get('/api/cart/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  // Logic to fetch the cart for this sessionId from the database or session storage
  // For example:
  const cart = getCartBySessionId(sessionId);
  if (cart) {
    res.json({ cart });
  } else {
    res.status(404).json({ message: 'Cart not found for this session' });
  }
});


  /**
   * Remove a product from the cart
   */
  app.delete('/api/cart/:sessionId/:productId', async (req, res) => {
    const { sessionId, productId } = req.params;

    try {
      // Remove product directly using $pull
      const cart = await Cart.findOneAndUpdate(
        { sessionId },
        { $pull: { products: { productId } } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }

      res.json({ success: true, data: cart, message: 'Product removed from cart successfully' });
    } catch (err) {
      console.error('Error removing product from cart:', err);
      res.status(500).json({ success: false, message: 'Error removing product from cart', error: err.message });
    }
  });

  /**
   * Update product quantity in the cart
   */
  app.put('/api/cart', async (req, res) => {
    const { sessionId, productId, quantity } = req.body;

    // Validate input
    if (!sessionId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid or missing required fields' });
    }

    try {
      const cart = await Cart.findOne({ sessionId });

      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }

      const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

      if (productIndex > -1) {
        // Update the quantity of the product
        cart.products[productIndex].quantity = quantity;
      } else {
        return res.status(404).json({ success: false, message: 'Product not found in cart' });
      }

      await cart.save();
      res.json({ success: true, data: cart, message: 'Product quantity updated successfully' });
    } catch (err) {
      console.error('Error updating product quantity in cart:', err);
      res.status(500).json({ success: false, message: 'Error updating product quantity', error: err.message });
    }
  });
};
