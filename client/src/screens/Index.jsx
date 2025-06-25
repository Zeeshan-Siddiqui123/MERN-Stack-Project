import React from 'react';
import { IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router-dom'

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

const Index = () => {
    return (
        <div className='bg-[#1c1d22] animate-slide-down'>
            <div className='relative  flex items-center justify-center overflow-hidden animate-slide-down'>
                <div className='flex items-center justify-between w-[90%] h-full px-10'>
                    <div className='flex items-center justify-center w-1/3'>
                        {/* <img
                            src="/images/hero_text.webp"
                            alt="Hero Text"
                            className='w-[250px] h-[250px] rounded-full object-cover border-4 border-white'
                        /> */}
                    </div>
                    <div className='relative flex flex-col items-center justify-center w-2/3 '>
                        <div className='relative mr-115 flex items-center mt-30 justify-center gap-10 z-10'>
                            <img
                                src="/images/hero_watch.webp"
                                alt="Watch 1"
                                className='w-[200px] transform rotate-[-20deg] lg:w-[300px]'
                            />
                            <img
                                src="/images/hero_watch.webp"
                                alt="Watch 2"
                                className='w-[200px] transform rotate-[20deg] lg:w-[300px]'
                            />
                        </div>
                        <p className='text-white text-6xl  font-bold text-center mr-115 mt-6 z-10 font-sans'>
                            <span className='text-red-500'>Limited Edition</span> Of High Quality Watches
                        </p>
                        <p className='text-yellow-400 font-bold text-2xl typewriter  text-center mr-115 mt-6 z-10 font-sans'>
                            Timeless design, crafted to perfection
                        </p>
                    </div>
                </div>
                <img
                    src="/images/hero_bg.svg"
                    alt=""
                    className="absolute bottom-0 left-0 min-w-full  opacity-10 pointer-events-none"
                    style={{ animation: 'spin 20s linear infinite' }}
                />
            </div>
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

            
            <div className='flex flex-wrap mt-2 gap-3'>
                <img src="/images/ss.png" alt="" />
                <div className='flex flex-col items-start gap-10 justify-center'>
                    <div>
                        <p className='text-white font-bold text-5xl'>TO Day Offer</p>
                        <p className='text-white mt-1'>Hurry Up, The Deal Will End Soon</p>
                    </div>
                    <div>
                        <p className='text-red-500 font-bold text-2xl'>Unbeatable Prices on Premium Timepieces!</p>
                    </div>
                    <div>
                        <Link to='/products'>
                            <button className='bg-white text-black px-12 py-5 hover:bg-black hover:text-white border border-white cursor-pointer transition duration-300 '>View All Product</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Index;
