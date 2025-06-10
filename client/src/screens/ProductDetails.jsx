import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { MdOutlineShoppingCart } from 'react-icons/md';
import { LuBus } from "react-icons/lu";
import { Button } from 'antd';

const ProductDetails = () => {
  const { title } = useParams();
   const [products, setProducts] = useState([]);

   const fetchProducts = () => {
       axios
         .get('http://localhost:3000/getproducts', { withCredentials: true })
         .then((res) => setProducts(res.data))
         .catch((err) => console.error('Error fetching products:', err));
     };
   
     useEffect(() => {
       fetchProducts();
     }, []);

  return (
    <div>
<div className='container mx-auto p-4 flex flex-col md:flex-row mt-16'>
      <div className='flex-1 '>
        <img src={products.file} alt={products.title} className='w-[400px] h-[450px] rounded-lg shadow-lg ml-16 mt-0' />
      </div>
      <div className='flex-1 p-4 gap-0'>
        <h1 className='text-2xl font-bold mb-2'>{products.title}</h1>
        <p className='text-lg mb-2'><strong>Price:</strong> ${products.price}</p>
        <p className='text-md mb-2'><strong>Description:</strong> {products.description}</p>
        {/* <p className='text-md mb-2'><strong>Category:</strong> {product.category}</p>
        {product.rating && (
          <div className='flex items-center mb-2'>
            <strong>Rating:</strong>
            <StarRating rating={product.rating.rate} /> 
            <span className='ml-2'>({product.rating.count} reviews)</span>
          </div>
        )} */}
        <div className='flex items-center space-x-2'>
          <Button
            type='primary'
            className='bg-yellow-500 flex items-center'
            // onClick={() => addToCart(products)}
          >
            <MdOutlineShoppingCart size='20' color='white' />
            <span className='ml-2'>Add to Cart</span>
          </Button>
          <Button
            type='primary'
            className='bg-[#f49521] flex items-center'
            // onClick={() => addToCart(products)}
          >
            <LuBus size='20' color='white' />
            <span className='ml-2'>Order Now</span>
          </Button>
        </div>
      </div>
      <Button >
        <Link to="/products">Go Back</Link>
      </Button>
    </div>
    </div>
  )
}

export default ProductDetails
