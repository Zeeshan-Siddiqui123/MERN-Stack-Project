import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { LuBus } from "react-icons/lu";
import { Button, Spin } from 'antd';

const ProductDetails = () => {
  const { id } = useParams();  // use id now
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/getproducts', { withCredentials: true });
      const selected = res.data.find(p => p._id === id);  // match by _id
      setProduct(selected);
    } catch (err) {
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className='text-center mt-20'>
        <div className='flex items-center justify-center'>
          <Spin size='large' />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='text-center mt-20'>
        <div className='flex items-center justify-center'>No Product Found</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 flex flex-col md:flex-row mt-16'>
      <div className='flex-1'>
        <img src={product.file} alt={product.title} className='w-[400px] h-[450px] rounded-lg shadow-lg ml-16' />
      </div>
      <div className='flex-1 p-4'>
        <h1 className='text-2xl font-bold mb-2'>{product.title}</h1>
        <p className='text-lg mb-2'><strong>Price:</strong> ${product.price}</p>
        <p className='text-md mb-4'><strong>Description:</strong> {product.description}</p>
        <div className='flex items-center space-x-2 mb-4'>
          <Button type='primary' className='bg-yellow-500 flex items-center'>
            <MdOutlineShoppingCart size='20' color='white' />
            <span className='ml-2'>Add to Cart</span>
          </Button>
          <Button type='primary' className='bg-[#f49521] flex items-center'>
            <LuBus size='20' color='white' />
            <span className='ml-2'>Order Now</span>
          </Button>
        </div>
        <Button>
          <Link to="/products">Go Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
