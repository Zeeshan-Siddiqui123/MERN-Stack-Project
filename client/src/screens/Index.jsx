import React from 'react'
import { Slider } from '../Components/Slider'

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
  return (
    <div>
      <div>
        <Slider />
      </div>
      <div className='flex items-center justify-center flex-col mt-7'>
        <h2 className='text-3xl font-bold'>Why Choose US</h2>
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
      <h2 className='text-3xl font-bold'>Featured Products</h2>
      </div>
    </div>
  )
}

export default Index