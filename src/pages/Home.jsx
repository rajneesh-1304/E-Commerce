import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';

const Home = ({ searchValue, cartItems, setCartItems }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const fetchProducts = async (query) => {
    try {
      let response;
      if (query) {
        response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      } else {
        response = await axios.get('https://dummyjson.com/products');
      }
      setProducts(response.data.products);

      localStorage.setItem(
        'products',
        JSON.stringify(response.data.products)
      );
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(searchValue);
    }, 2000);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);


  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <div className="home">
        {currentProducts.map((card) => (
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

      <div className="pagination">
        <button
        disabled={currentPage===1}
        onClick={()=> setCurrentPage(prev => prev-1)}>
          Prev
        </button>

        <span> Page {currentPage} of {totalPages}</span>

        <button
        disabled={currentPage===totalPages}
        onClick={()=> setCurrentPage(prev => prev+1)}>
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
