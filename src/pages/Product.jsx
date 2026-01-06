import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import '../index.css'

const Product = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setDetail(response.data);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!detail) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
    <div className='detail'>
      <div className='detail_left'><img className='detail_img' src={detail.thumbnail} alt="" /></div>
      <div className='detail_right'>
        <p className='detail_title'>{detail.title}</p>
        <p className='detail_description'>{detail.description}</p>
        <p className='detail_price'>Price : ${detail.price}</p>
      </div>
    </div>
    </div>
  );
};

export default Product;
