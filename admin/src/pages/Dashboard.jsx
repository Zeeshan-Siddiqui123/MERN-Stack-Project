import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatsCard from '../components/StatsCard';
import AnalyticsChart from '../components/AnalyticsChart';
import { API } from '../../API';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get(`${API}/getusers`),
          axios.get(`${API}/getproducts`),
          axios.get(`${API}/orders`),
        ]);

        const totalRevenue = ordersRes.data.reduce(
          (acc, order) => acc + (order.amount || 0), 0
        );

        // Mock logic for top-selling (replace with real backend logic)
        const productCount = {};
        ordersRes.data.forEach(order => {
          order.cartItems?.forEach(item => {
            productCount[item.title] = (productCount[item.title] || 0) + (item.quantity || 1);
          });
        });

        const top = Object.entries(productCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([title, quantity]) => ({ title, quantity }));

        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          revenue: totalRevenue,
        });

        setRecentOrders(ordersRes.data.slice(0, 5));
        setTopProducts(top);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] p-6 mt-16 ml-60">
      <h1 className="text-white text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6">
        <StatsCard label="Total Users" value={stats.users} icon="users" />
        <StatsCard label="Total Products" value={stats.products} icon="products" />
        <StatsCard label="Total Orders" value={stats.orders} icon="orders" />
        <StatsCard label="Revenue" value={`Rs ${stats.revenue}`} icon="revenue" />
      </div>

      {/* Analytics Chart */}
      <div className="mt-10">
        <AnalyticsChart orders={stats.orders} revenue={stats.revenue} />
      </div>

      
    </div>
  );
};

export default Dashboard;
