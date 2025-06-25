import React from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { Link, Outlet } from 'react-router-dom';

const Product = () => {
  return (
    <div className='bg-[#1c1d22] mt-22 p-4 sm:p-6 animate-slide-down'>
      <h1 className='text-white text-center font-bold text-3xl sm:text-5xl'>Our Product</h1>
      <h3 className="text-white/80 text-xl sm:text-2xl text-center mt-4">
        Unbeatable Prices on Premium Timepieces!
      </h3>

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[500px] mt-6 rounded overflow-hidden">
        <img src="/images/bg-image.webp" alt="" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <p className="text-white/80 text-2xl sm:text-4xl font-bold leading-snug">
            Elevate Your Wristwear with Our <br className="hidden sm:block" /> Finest Collection
          </p>
        </div>
      </div>

      {/* Product Categories */}
      <div className='flex flex-wrap justify-center items-center gap-6 mt-8'>
        {categoryData.map(({ image, title, path }, i) => (
          <div key={i} className="relative w-full sm:w-[300px] md:w-[400px]">
            <img src={image} alt={title} className='w-full h-[280px] object-cover rounded' />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-[85%] h-[80px] rounded-md shadow-md flex justify-between items-center px-4">
              <div className='flex flex-col'>
                <p className='text-black font-sans'>{title}</p>
                <p className='text-black font-bold text-xl font-sans'>Shop Now</p>
              </div>
              <Link to={path}>
                <div className='group border-l border-black pl-4 h-full flex justify-center items-center hover:bg-black transition duration-300 cursor-pointer'>
                  <IoArrowForward
                    size={30}
                    className='text-black group-hover:text-white transition duration-300'
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

const categoryData = [
  {
    title: "Couple's Best Seller",
    image: "/images/couples.webp",
    path: "/products/couple"
  },
  {
    title: "Men's Best Seller",
    image: "/images/men.webp",
    path: "/products/men"
  },
  {
    title: "Women's Best Seller",
    image: "/images/women.webp",
    path: "/products/women"
  },
];

export default Product;
