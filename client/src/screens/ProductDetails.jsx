import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { CartContext } from '../screens/CartContext';
import { LuBus } from "react-icons/lu";
import { Button, message, Spin } from 'antd';
import { useContext } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/getproduct/${id}`, {
        withCredentials: true,
      });
      setProduct(res.data);
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
        <Spin size='large' />
      </div>
    );
  }



  return (
    <div className='container  mx-auto p-4 flex flex-col md:flex-row mt-20'>
      <div className='flex-1 flex justify-center'>
        <img
          src={`http://localhost:3000/images/uploads/${product.file}`}
          alt={product.title}
          className='w-[400px] h-[450px] rounded-lg shadow-lg object-cover'
        />
      </div>
      <div className='flex-1 p-4'>
        <h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
        <p className='text-lg mb-2'><strong>Price:</strong> Rs: {product.price}</p>
        <p className='text-md mb-6'><strong>Description:</strong> {product.description}</p>
        <p className='text-md mb-6'><strong>Category:</strong> {product.category}</p>
        <div className='flex flex-wrap gap-4 mb-4'>

          <Button
            type='primary'
            className='bg-yellow-500 flex items-center'
            onClick={() => {
              addToCart(product);  // product._id handled in context
              message.success(`${product.title} added to cart`);
            }}
          >
            <MdOutlineShoppingCart size={20} className='text-white' />
            <span className='ml-2'>Add to Cart</span>
          </Button>


          <Button type='primary' className='bg-[#f49521] flex items-center' >
            <LuBus size={20} className='text-white' />
            <span className='ml-2'>Order Now</span>
          </Button>
        </div>
        <Link to="/products">
          <Button className='bg-gray-700 text-white'>Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
