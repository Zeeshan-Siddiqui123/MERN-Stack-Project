import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../API';
import { message, Spin } from 'antd';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

 useEffect(() => {
  if (!userId) {
    message.warning("Please login to view orders");
    setLoading(false);
    return;
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      message.error("Could not fetch your orders.");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [userId]);



  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>

      {loading ? (
        <Spin size="large" />
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-700 shadow"
            >
              <p><span className="font-bold">Product:</span> {order.product}</p>
              <p><span className="font-bold">Amount:</span> Rs {order.amount}</p>
              <p><span className="font-bold">Status:</span> 
                <span className={`ml-2 font-semibold ${order.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {order.status}
                </span>
              </p>
              <p><span className="font-bold">Ordered At:</span> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
