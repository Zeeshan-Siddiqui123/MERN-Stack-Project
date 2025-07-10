import React, { useEffect, useState } from 'react';
import { Table, Tag, message } from 'antd';
import axios from 'axios';
import { API } from '../../API'; // Make sure your API base URL is correct

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/admin/orders`);
      setOrders(res.data);
    } catch (error) {
      message.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Define table columns
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: text => <span className="text-gray-400">{text}</span>,
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Amount (Rs)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Completed' ? 'green' : 'gold'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Ordered At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="p-6 bg-[#121212] min-h-screen mt-16 ml-60 text-white">
      <h1 className="text-2xl font-bold mb-6">All Orders (Admin)</h1>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }} 
      />
    </div>
  );
};

export default Orders;
