import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-flip';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export const Slider = () => {
    const data = [
        {
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/89670937352801.573d3df298ad9.jpg",
        },
        {
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/89670937352801.573d3df298ad9.jpg",
        },
        {
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/89670937352801.573d3df298ad9.jpg",
        },
        {
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/89670937352801.573d3df298ad9.jpg",
        },
        {
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/89670937352801.573d3df298ad9.jpg",
        },
        {
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/89670937352801.573d3df298ad9.jpg",
        },
        {
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/89670937352801.573d3df298ad9.jpg",
        },
    ];

    return (
        <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={10}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
                delay: 3000, // time in ms (3 seconds)
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
            }}
        >
            {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className='relative w-full h-[285px] bg-black overflow-hidden'>
                        <img src={item.img} alt={`Slide ${index}`} className='w-full h-full object-cover' />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};