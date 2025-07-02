import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, message } from 'antd';
import { API } from '../../API';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/getusers`, {
        withCredentials: true
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: 'User ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] p-6 mt-16 ml-60">
      <h2 className="text-2xl font-bold mb-6 text-white">Registered Users</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
          bordered
        />
      )}
    </div>
  );
};

export default Users;
