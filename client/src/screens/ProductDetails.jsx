import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { LuBus } from 'react-icons/lu';
import { Button, message, Spin } from 'antd';
import { useDispatch } from 'react-redux'; // ✅ Redux
import {  addToCartAndSave } from '../features/cart/cartSlice';
 // ✅ Adjust path if needed

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/getproduct/${id}`);
        setProduct(res.data);

        const relatedRes = await axios.get(`http://localhost:3000/related/${res.data.category}/${res.data._id}`);
        setRelated(relatedRes.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrderNow = () => {
    navigate('/payment', {
      state: {
        product: { ...product, quantity: 1 }
      }
    });
  };

  const handleAddToCart = () => {
    dispatch(addToCartAndSave(product)); // ✅ Redux action
    message.success(`${product.title} added to cart`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212] text-white">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-white mt-20">Product not found.</div>
    );
  }

  return (
    <div className="bg-[#1f1f1f] flex flex-col items-center justify-center min-h-screen animate-slide-down">
      {/* Main Product Section */}
      <div className="w-full p-6 space-y-16 mt-24 mx-auto md:p-10 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={`http://localhost:3000/images/uploads/${product.file}`}
            alt={product.title}
            className="w-full max-w-[400px] h-[450px] object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white">{product.title}</h1>
            <p className="text-xl text-green-400 font-semibold mt-2">Rs: {product.price}</p>
            <p className="text-gray-400 mt-1"><strong>Category:</strong> {product.category}</p>
          </div>

          <p className="text-gray-400">{product.description}</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 flex items-center px-4 py-2 text-white rounded-md"
              onClick={handleAddToCart}
            >
              <MdOutlineShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>

            <Button
              type="primary"
              className="bg-[#f49521] hover:bg-[#e2841e] flex items-center px-5 py-2 rounded-md"
              onClick={handleOrderNow}
            >
              <LuBus size={20} className="mr-2 text-white" />
              Order Now
            </Button>

            <Link to="/products">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-md">
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {/* <div className='w-full mx-auto md:p-10 flex flex-col md:flex-row gap-10'>
        {related.length > 0 && (
          <div className="text-white flex-1">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">Related Products</h2>
            <div className="flex items-center justify-center flex-wrap gap-3">
              {related.map(item => (
                <div key={item._id} className='w-[400px] bg-black p-3'>
                  <div className="shadow-md p-4 w-[400px] flex items-center justify-center">
                    <img
                      src={`http://localhost:3000/images/uploads/${item.file}`}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h3 className="mt-2 font-semibold text-lg text-white">{item.title}</h3>
                    <p className="text-white font-medium">Rs: {item.price}</p>
                    <Link to={`/product-details/${item._id}`}>
                      <button className='bg-white w-full text-black px-12 py-3 hover:bg-black hover:text-white border border-white cursor-pointer transition duration-300'>
                        Order Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Related Products</h2>
      <div className="flex flex-wrap justify-center">
        
        {related.length === 0 ? (
          <p className="text-white text-center">No men products found.</p>
        ) : (
          related.map(item => (
            <div
              key={item._id}
              className="w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div className="bg-black rounded-lg shadow-md p-3 h-full flex flex-col">
                <div className="flex justify-center items-center mb-3">
                  <img
                    src={`http://localhost:3000/images/uploads/${item.file}`}
                    alt={item.title}
                    className="w-full md:w-1/1 p-2 h-28 lg:h-48 md:h-48 object-cover rounded"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <h3 className="font-semibold text-white text-base truncate">{item.title}</h3>
                  <p className="text-[#f49521] font-medium text-sm">Rs: {item.price}</p>
                  <Link to={`/product-details/${item._id}`}>
                      <button className='mt-auto w-full bg-white text-black text-sm py-2 rounded hover:bg-black hover:text-white border border-white transition'>
                        Order Now
                      </button>
                    </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
