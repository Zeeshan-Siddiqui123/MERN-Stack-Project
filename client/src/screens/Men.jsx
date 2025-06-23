import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { message } from 'antd'; 
import { Link } from 'react-router-dom';

const Men = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/products/category?name=Men')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleProtectedClick = (productId) => {
    if (!user) {
      message.warning("Please login to view product");
      navigate('/login');
      return;
    }

    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-white text-center font-bold mb-4">Men Watches</h2>
      <div className="flex flex-wrap items-center justify-center gap-15">
        {products.length === 0 ? (
          <p>No men products found.</p>
        ) : (
          products.map(product => (
            <div key={product._id} className='w-[400px] bg-black p-3'>
              <div className="shadow-md p-4 w-[400px] flex items-center justify-center">
                <img
                  src={`http://localhost:3000/images/uploads/${product.file}`}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className="mt-2 font-semibold text-lg text-white">{product.title}</h3>
                <p className="text-white font-medium">Rs: {product.price}</p>
                <button
                  onClick={() => handleProtectedClick(product._id)}
                  className='bg-white w-full text-black px-12 py-3 hover:bg-black hover:text-white border border-white cursor-pointer transition duration-300'
                >
                  Order Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Men;
