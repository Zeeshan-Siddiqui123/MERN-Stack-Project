import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  const { name, username, email, password } = data;

  if (!name || !username || !email || !password) {
    setError('All fields are required');
    setTimeout(() => setError(''), 2000);
    return;
  }

  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (data.image) {
      formData.append('file', data.image); // ✅ Use 'file' to match backend
    }

    const res = await axios.post('http://localhost:3000/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setMessage(res.data.message);
    setError('');
    setData({ name: '', username: '', email: '', password: '', image: null });
    setPreview(null);

    setTimeout(() => {
      setMessage('');
      navigate('/login');
    }, 2000);
  } catch (err) {
    setError(err.response?.data?.message || 'Signup failed');
    setMessage('');
    setTimeout(() => setError(''), 2000);
  }
};

  return (
    <div className="min-h-screen mt-22 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 animate-slide-down">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="text-sm text-gray-300 "
            />

          <input
            type="submit"
            value="Sign Up"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md cursor-pointer transition"
          />

          {message && <p className="text-green-400 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-center text-gray-300 text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="underline text-blue-400 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
