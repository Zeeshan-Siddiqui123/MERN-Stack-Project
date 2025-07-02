import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { message } from 'antd';
import { API } from '../../API';

const Men = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get(`${API}/products/category?name=Men`)
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
    <div className="p-4 sm:p-6  ">
      <h2 className="text-3xl text-white text-center font-bold mb-8">Men Watches</h2>

      <div className="flex flex-wrap justify-center">
        {products.length === 0 ? (
          <p className="text-white text-center">No men products found.</p>
        ) : (
          products.map(product => (
            <div
              key={product._id}
              className="w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div className="bg-black rounded-lg shadow-md p-3 h-full flex flex-col">
                <div className="flex justify-center items-center mb-3">
                  <img
                    src={`${API}/images/uploads/${product.file}`}
                    alt={product.title}
                    className="w-full md:w-1/1  p-2 h-28 lg:h-48 md:h-48 object-cover rounded"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <h3 className="font-semibold text-white text-base truncate">{product.title}</h3>
                  <p className="text-[#f49521] font-medium text-sm">Rs: {product.price}</p>
                  <button
                    onClick={() => handleProtectedClick(product._id)}
                    className="mt-auto bg-white text-black text-sm py-2 rounded hover:bg-black hover:text-white border border-white transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Men;
