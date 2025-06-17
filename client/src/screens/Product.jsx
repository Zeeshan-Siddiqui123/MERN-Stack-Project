import React from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { Link, Outlet } from 'react-router-dom'

const Product = () => {
  return (
    <div className='bg-[#1c1d22] p-2'>
      <h1 className='text-white text-center font-bold text-5xl'>Our Product</h1>
      <h3 className="text-white/80 text-2xl text-center mt-4">
        Unbeatable Prices on Premium Timepieces!
      </h3>
      <div className="relative w-full h-[500px]">
        <img src="/images/bg-image.webp" alt="" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center  items-center  bg-opacity-40 text-center">
          <p className="text-white/80 text-5xl font-bold font-sans">
            Elevate Your Wristwear with Our <br /> Finest Collection
          </p>

        </div>
      </div>


      <div className='flex items-center justify-center flex-wrap mt-5'>
        <div className="relative w-fit">
          <img src="/images/couples.webp" alt="" className='w-[500px] h-[326.95px]' />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-[400px] h-[80px] rounded-md shadow-md flex justify-between items-center ">
            <div className='flex flex-col ml-2'>
              <p className='text-black font-sans'>Couple's Best Seller</p>
              <p className='text-blacl font-bold text-xl font-sans'>Shop Now</p>
            </div>
            <Link to='/products/couple'>
              <div className='group border-l border-l-black w-[80px] h-[80px] flex justify-center items-center hover:bg-black cursor-pointer transition duration-300'>
                <IoArrowForward
                  size={50}
                  className='text-black group-hover:text-white transition duration-300'
                />
              </div>
            </Link>

          </div>
        </div>
        <div className="relative w-fit">
          <img src="/images/men.webp" alt="" className='w-[500px]' />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-[400px] h-[80px] rounded-md shadow-md flex justify-between items-center ">
            <div className='flex flex-col ml-2'>
              <p className='text-black font-sans'>Men's Best Seller</p>
              <p className='text-blacl font-bold text-xl font-sans'>Shop Now</p>
            </div>
            <Link to='/products/men'>
              <div className='group border-l border-l-black w-[80px] h-[80px] flex justify-center items-center hover:bg-black cursor-pointer transition duration-300'>
                <IoArrowForward
                  size={50}
                  className='text-black group-hover:text-white transition duration-300'
                />
              </div>
            </Link>

          </div>
        </div>
        <div className="relative w-fit">
          <img src="/images/women.webp" alt="" className="w-[500px]" />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-[400px] h-[80px] rounded-md shadow-md flex justify-between items-center ">
            <div className='flex flex-col ml-2'>
              <p className='text-black font-sans'>Women's Best Seller</p>
              <p className='text-blacl font-bold text-xl font-sans'>Shop Now</p>
            </div>
            <Link to='/products/women'>
              <div className='group border-l border-l-black w-[80px] h-[80px] flex justify-center items-center hover:bg-black cursor-pointer transition duration-300'>
                <IoArrowForward
                  size={50}
                  className='text-black group-hover:text-white transition duration-300'
                />
              </div>
            </Link>

          </div>
        </div>
      </div>
      <Outlet />

    </div>
  )
}

export default Product
