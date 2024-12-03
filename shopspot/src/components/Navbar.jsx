import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('token'); 

  return (
    <div className='nav'>
      <div className='nav-left'>
        <img
          className='nav-img'
          src='https://i.pinimg.com/736x/0e/3c/00/0e3c004c4c5692d06d359b6b2f10eaed.jpg'
          alt='Logo'
        />
      </div>
      <div className='nav-center'>
        <Link className='nav-items' to='/'>Home</Link>
        <Link className='nav-items' to='/shop'>Shop</Link>
        <Link className='nav-items' to='/thrift'>Thrift</Link>
        <Link className='nav-items' to='/about'>About</Link>
        <Link className='nav-items' to='/contact'>Contact</Link>
        <Link className='nav-items' to='/review'>Reviews</Link>

      </div>
      <div className='nav-right'>
        {isAuthenticated ? (
          <>
            <Link className='nav-items' to='/profile'>Profile</Link>
            <button className='nav-items' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className='nav-items' to='/login'>Login</Link>
            <Link className='nav-items' to='/signup'>Register</Link>
          </>
        )}
        <Link className='nav-items' to='/cart_main'>Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;
