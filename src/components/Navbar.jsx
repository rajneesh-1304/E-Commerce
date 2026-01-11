import React from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ searchValue, setSearchValue }) => {

const navigate = useNavigate();
  const cartt = ()=>{
    navigate('/cart')
  }

   const handleMain = ()=>{
    navigate('/');
   }
  return (
    <div className='navbar'>
      <h1 className='heading' onClick={handleMain}>ShopHub</h1>
      <input
        className='search_bar'
        placeholder='Search...'
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className='cart_button' onClick={cartt}>🛒 Cart</button>
    </div>
  );
};

export default Navbar;
