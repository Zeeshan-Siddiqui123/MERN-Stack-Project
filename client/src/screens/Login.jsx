import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { message } from 'antd';


const Login = () => {
  const [data, setData] = useState({ email: '', password: '', image: null });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { fetchUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      setError('All fields are required');
      setTimeout(() => setError(''), 2000);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/login', data, {
        withCredentials: true,
      });

      message.success({
        content: 'Login successful!',
        duration: 2, // seconds
      });

      setError('');
      setData({ email: '', password: '' });

      localStorage.setItem('userId', res.data.userId);
      await fetchUser();

      navigate('/');
    } catch (err) {
      message.error(err.response?.data?.message || 'Login failed'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 px-4 text-white animate-slide-down">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={data.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />



          <input
            type="submit"
            value="Login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md cursor-pointer transition"
          />

          
          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-center text-gray-300 text-sm mt-4">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline text-blue-400 font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
