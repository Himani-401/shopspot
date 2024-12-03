import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './ProductDetails.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity); 
      navigate('/cart'); 
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="go-back-button" onClick={() => navigate('/shop')}>Go Back to Shop</button>
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
