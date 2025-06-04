import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-100 p-4 shadow-md">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <nav className="space-y-2">
        <Link to="/" className="block">Dashboard</Link>
        <Link to="/products" className="block">Products</Link>
        <Link to="/orders" className="block">Orders</Link>
        <Link to="/users" className="block">Users</Link>
      </nav>
    </div>
  );
};
export default Sidebar;