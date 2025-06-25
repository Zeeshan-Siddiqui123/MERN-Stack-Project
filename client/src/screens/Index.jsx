import React from 'react';
import { IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router-dom';

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
        <div className='bg-[#1c1d22] animate-slide-down mt-22'>

            {/* Hero Section */}
            <div className='relative flex flex-col lg:flex-row items-center justify-center overflow-hidden px-4 lg:px-10 py-10'>
                <img
                    src="/images/hero_bg.svg"
                    alt=""
                    className="absolute bottom-0 left-0 w-full  opacity-10 pointer-events-none"
                    style={{ animation: 'spin 20s linear infinite' }}
                />
                <div className='flex items-center justify-center w-full lg:w-1/3 mb-6 lg:mb-0'>
                    <div className='relative flex flex-col items-center justify-center w-full lg:w-2/3'>
                        <div className='flex  sm:flex-row justify-center items-center gap-6'>
                            <img
                                src="/images/hero_watch.webp"
                                alt="Watch 1"
                                className='w-40 sm:w-52 lg:w-[300px] transform rotate-[-20deg]'
                            />
                            <img
                                src="/images/hero_watch.webp"
                                alt="Watch 2"
                                className='w-40 sm:w-52 lg:w-[300px] transform rotate-[20deg]'
                            />
                        </div>

                        <h1 className='text-white lg:text-7xl xl:text-4xl font-bold text-center mt-6 font-sans'>
                            <span className='text-red-500'>Limited Edition</span> Of High Quality Watches
                        </h1>
                        <div className=''>
                            <p className='text-yellow-400 font-bold text-sm lg:text-2xl  text-center mt-4 font-sans typewriter'>
                                Timeless design,  crafted to perfection
                            </p>
                        </div>

                    </div>
                </div>



                
            </div>

            {/* Category Cards */}
            <div className='flex flex-wrap justify-center items-center gap-6 mt-8 px-4'>
                {categoryData.map(({ image, title, path }, i) => (
                    <div key={i} className="relative w-full sm:w-[300px] md:w-[400px]">
                        <img src={image} alt={title} className='w-full h-[250px] object-cover rounded' />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-[90%] h-[80px] rounded-md shadow-md flex justify-between items-center px-4">
                            <div className='flex flex-col'>
                                <p className='text-black font-sans'>{title}</p>
                                <p className='text-black font-bold text-lg font-sans'>Shop Now</p>
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

            {/* Offer Section */}
            <div className='flex flex-col  lg:flex-row items-center justify-center gap-6 mt-12 px-4'>
                <img src="/images/ss.png" alt="" className='w-full lg:w-[700px] md:w-[400px] object-contain' />
                <div className='flex flex-col items-center justify-center gap-6 text-white text-center lg:text-left'>
                    <div>
                        <p className='font-bold text-3xl sm:text-4xl'>Today’s Offer</p>
                        <p className='mt-2'>Hurry Up, The Deal Will End Soon</p>
                    </div>
                    <p className='text-red-500 font-bold text-lg sm:text-xl'>
                        Unbeatable Prices on Premium Timepieces!
                    </p>
                    <Link to='/products'>
                        <button className='bg-white text-black px-6 py-3 hover:bg-black hover:text-white border border-white transition'>
                            View All Products
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Index;
