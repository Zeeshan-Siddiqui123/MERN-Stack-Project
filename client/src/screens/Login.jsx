import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!email || !password) {
      setError("All fields are required");
      setTimeout(() => setError(""), 2000);
      setMessage("");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", data);
      setMessage(res.data.message);
      setError("");
      setData({ email: "", password: "" });

      setTimeout(() => {
        setMessage("");
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setTimeout(() => setError(""), 2000);
      setData({ email: "", password: "" });
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-black p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login Your Account</h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={data.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="submit"
            value="Login"
            className="bg-white text-black font-semibold py-2 rounded-md cursor-pointer hover:bg-gray-200 transition"
          />

          {message && (
            <p className="text-green-400 text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <p className="text-center text-gray-300 text-sm mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/create-account" className="underline text-white font-medium">Create Account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
