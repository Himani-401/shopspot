import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ThriftStorePage from './components/thrift/ThriftStorePage';
import CartPage from './components/thrift/CartPage';
import ExploreMorePage from './components/thrift/ExploreMorePage';
import { CartProvider } from './components/thrift/CartContext';
import Cart_main from './components/Cart_main';
import ContactPage from './components/ContactPage';
import ReviewPage from './components/ReviewPage';



function App() {
  return (
    <CartProvider>  
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/cart_main" element={<Cart_main/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path ="/profile" element={<Profile/>}/>
            <Route path ="/thrift" element={<ThriftStorePage/>}/>
            <Route path ="/cart" element={<CartPage/>}/>
            <Route path ="/explore-more" element={<ExploreMorePage/>}/>
            <Route path ="/review" element={<ReviewPage/>}/>
          


          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
