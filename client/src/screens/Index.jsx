import React from 'react';
import { IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className='bg-[#1c1d22]'>
            <div className='relative  flex items-center justify-center overflow-hidden'>
                <div className='flex items-center justify-between w-[90%] h-full px-10'>
                    <div className='flex items-center justify-center w-1/3'>
                        {/* <img
                            src="/images/hero_text.webp"
                            alt="Hero Text"
                            className='w-[250px] h-[250px] rounded-full object-cover border-4 border-white'
                        /> */}
                    </div>
                    <div className='relative flex flex-col items-center justify-center w-2/3'>
                        <div className='relative mr-115 flex items-center mt-30 justify-center gap-10 z-10'>
                            <img
                                src="/images/hero_watch.webp"
                                alt="Watch 1"
                                className='w-[300px] transform rotate-[-20deg] '
                            />
                            <img
                                src="/images/hero_watch.webp"
                                alt="Watch 2"
                                className='w-[300px] transform rotate-[15deg] '
                            />
                        </div>
                        <p className='text-white text-6xl  font-bold text-center mr-115 mt-6 z-10 font-sans'>
                            Limited Edition Of High Quality Watches
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
            <div className='flex items-center justify-center flex-wrap mt-10'>
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
            <div className='flex mt-2 gap-3'>
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
