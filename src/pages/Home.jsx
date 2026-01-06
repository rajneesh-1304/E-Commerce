import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';

const Home = ({ searchValue, cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (query) => {
    try {
      let response;
      if (query) {
        response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      } else {
        response = await axios.get('https://dummyjson.com/products');
      }
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(searchValue);
  }, [searchValue]);

  return (
    <div className='home'>
      {products.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          thumbnail={card.thumbnail}
          title={card.title}
          price={card.price}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}
    </div>
  );
};

export default Home;
