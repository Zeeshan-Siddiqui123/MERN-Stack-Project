import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-60 bg-[#1f1f1f] text-white h-screen fixed top-16 left-0 p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-[#f49521]">Dashboard</Link>
        <Link to="/products" className="hover:text-[#f49521]">Products</Link>
        <Link to="/orders" className="hover:text-[#f49521]">Orders</Link>
        <Link to="/users" className="hover:text-[#f49521]">Users</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
