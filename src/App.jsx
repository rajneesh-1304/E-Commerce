import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cartItems, setCartItems] = useState(() => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    if (!savedCart) return [];
    return JSON.parse(savedCart);
  } catch (error) {
    console.error("Invalid cartItems in localStorage. Resetting...");
    localStorage.removeItem('cartItems');
    return [];
  }
});



  useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

  return (
    <BrowserRouter>
      <Navbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Routes>
        <Route
          path='/'
          element={<Home
            searchValue={searchValue}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />}
        />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
