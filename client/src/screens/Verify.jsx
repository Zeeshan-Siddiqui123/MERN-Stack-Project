import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/verify-otp', { email, otp });
      setMessage(res.data.message);
      setError('');
      setTimeout(() => {
        setMessage("")
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying OTP');
    
      setMessage('');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-10 text-white mt-22'>
      <h3 className='text-3xl mb-5 text-white'>Verify Your Email</h3>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg text-black'>
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md" required />
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md" required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Verify</button>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Verify;
