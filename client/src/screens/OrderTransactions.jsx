// components/OrderTransactions.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTransactions = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/orders') // Your backend endpoint
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Order Transactions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-[#1e1e1e] rounded-xl">
          <thead>
            <tr className="bg-[#2a2a2a] text-left">
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t border-gray-700">
                <td className="p-3">{order.user?.name || 'Guest'}</td>
                <td className="p-3">Rs. {order.totalAmount}</td>
                <td className="p-3">{order.paymentMethod}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTransactions;
