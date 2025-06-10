import React, { useEffect, useState } from 'react'
import { Slider } from '../Components/Slider'
import axios from 'axios'
import { Link } from 'react-router-dom'

const cardData = [
  {
    img: "https://incandescent-macaron-564e08.netlify.app/img/features/f2.png",
    content: "Online Order"
  },
  {
    img: "https://incandescent-macaron-564e08.netlify.app/img/features/f3.png",
    content: "Save Money"
  },
  {
    img: "https://incandescent-macaron-564e08.netlify.app/img/features/f6.png",
    content: "24/7 Support"
  },

]

const Index = () => {
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
      <div>
        <Slider />
      </div>
      <div className='flex items-center justify-center flex-col mt-7'>
        <h2 className='text-3xl font-bold text-gray-900'>Why Choose US</h2>
        <div className='flex items-center justify-center gap-10 flex-wrap mt-7'>
          {cardData.map((data,index)=>(
            <div key={index} className='pt-5 pb-5 pl-3 pr-3 border border-[#088178] rounded-2xl flex items-center gap-3 flex-col'>
              <img src={data.img} alt="" className='h-[100px]'/>
              <p className='p-1 bg-[#d1e8f2] text-[#088178] rounded-lg text-sm'>{data.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center flex-col mt-9">
      <h2 className='text-3xl font-bold text-gray-900'>Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-7">
        {products.length === 0 ? (
          <p className="text-center text-gray-900 col-span-full">No products found</p>
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
                <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-900">
                  No Image
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{product.title}</h3>
              <p className="text-blue-600 font-semibold">Rs: {product.price}</p>
              <div className="btn">
                <Link to={`/product/product-details/${product.title}}`}><button className='bg-gray-900 text-white mt-2 w-full p-2 rounded-lg cursor-pointer'>Order Now</button></Link>

              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  )
}

export default Index