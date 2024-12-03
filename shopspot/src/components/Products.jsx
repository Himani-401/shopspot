import React, { useState } from 'react';
import './Products.css';

const Products = () => {
  const products = [
    {
      name: 'Scented Soy Candles Set',
      price: '₹250.00',
      image: 'https://i.pinimg.com/736x/2a/6e/c5/2a6ec51230500cd5193005c26dc0cba1.jpg', 
    },
    {
      name: 'Glowing LED Balloons',
      price: '₹150.00',
      image: 'https://i.pinimg.com/736x/4a/e6/0c/4ae60c85f44722eb4cbaedb46dffd8e7.jpg', 
    },
    {
      name: 'Rustic Wooden Wall Art',
      price: '₹600.00',
      image: 'https://i.pinimg.com/736x/0a/db/1f/0adb1f1ab217c726b828b0e18ecb3745.jpg', 
    },
    {
      name: 'Custom Printed Balloons',
      price: '₹200.00',
      image: 'https://i.pinimg.com/736x/79/eb/54/79eb5441f30d69e55bef8521d0d051d7.jpg', 
    },
    {
      name: 'Decorative Fairy Lights',
      price: '₹300.00',
      image: 'https://i.pinimg.com/736x/c0/3b/b2/c03bb2fcee8359fc8d2b93550a16d7b5.jpg', 
    },
    {
      name: 'Handmade Ceramic Vases',
      price: '₹500.00',
      image: 'https://i.pinimg.com/736x/71/c3/cb/71c3cb4e774e1e721c8e35479003bcd9.jpg', 
    },
    {
      name: 'Macrame Plant Hangers',
      price: '₹350.00',
      image: 'https://i.pinimg.com/736x/e4/16/db/e416dbf2c86e6a6c8f8e902669cf0a7b.jpg',
    },
    {
      name: 'Vintage Table Lamp',
      price: '₹750.00',
      image: 'https://i.pinimg.com/736x/ae/56/70/ae567057d35f8052a64de7cda7359e36.jpg', 
    },
  ];

  const [visibleCount, setVisibleCount] = useState(4);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); 
  };

  return (
    <section className="products-home">
      <h2 >Products</h2>
      <div className="product-grid-home">
        {products.slice(0, visibleCount).map((product, index) => (
          <div className="product-card-home" key={index}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      {visibleCount < products.length && (
        <button className="load-more-home" onClick={loadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default Products;
