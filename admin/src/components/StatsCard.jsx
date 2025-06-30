import React from 'react';
import { FaUsers, FaBox, FaShoppingCart, FaRupeeSign } from 'react-icons/fa';

const iconMap = {
  users: <FaUsers size={22} className="text-[#f49521]" />,
  products: <FaBox size={22} className="text-[#f49521]" />,
  orders: <FaShoppingCart size={22} className="text-[#f49521]" />,
  revenue: <FaRupeeSign size={22} className="text-[#f49521]" />,
};

const StatsCard = ({ label, value, icon }) => (
  <div className="bg-[#1f1f1f] p-4 rounded-lg flex items-center gap-4 shadow-md">
    <div className="bg-[#2c2c2c] p-3 rounded-full">
      {iconMap[icon]}
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="text-xl font-semibold text-white">{value}</h3>
    </div>
  </div>
);

export default StatsCard;
