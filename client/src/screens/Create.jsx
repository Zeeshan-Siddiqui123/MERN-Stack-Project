import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username, email,  password } = data;
    if (!name || !username || !email || !password) {
      setError("All fields are required");
      setTimeout(() => setError(""), 1000);
      setMessage("");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/register", data);
      setMessage(res.data.message);
      setError("");
      setData({});
      setTimeout(() => {
        setMessage("");
        navigate('/verify');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setTimeout(() => setError(""), 1000);
      setData({
        name: "",
        username: "",
        email: "",
        password: ""
      });
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-xl bg-black text-white shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="submit"
            value="Create Account"
            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-300 transition"
          />

          {message && (
            <p className="text-green-400 text-center font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="underline text-white font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Create;
