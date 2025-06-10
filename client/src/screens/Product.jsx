import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
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
      <h1 className='text-center font-bold mb-1'>Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {product.file ? (
                <img
                  src={`http://localhost:3000/images/uploads/${product.file}`}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{product.title}</h3>
              <p className="text-blue-600 font-semibold">Rs: {product.price}</p>
              <div className="btn">
                <Link to={`/product/product-details/${product.title}}`}><button className='bg-black text-white mt-2 w-full p-2 rounded-lg cursor-pointer'>Order Now</button></Link>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Product
