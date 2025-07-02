import React, { useState } from 'react';
import { message } from 'antd';
import { MdEmail, MdPerson, MdMessage, MdOutlinePhone } from 'react-icons/md';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import { API } from '../../API';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, formData);
      message.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      message.error('Something went wrong. Try again!');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 animate-slide-down">
      <div className="max-w-2xl mx-auto bg-[#1f1f1f] rounded-lg shadow-lg p-8 mt-36">
        <div className='flex  gap-2 justify-center'>
          <div>
            <MdOutlinePhone className=" text-green-400" size={30} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center"> Contact Us</h2>
          </div>

        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center bg-[#2a2a2a] p-3 rounded">
            <MdPerson className="text-xl mr-3 text-orange-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <div className="flex items-center bg-[#2a2a2a] p-3 rounded">
            <MdEmail className="text-xl mr-3 text-yellow-400" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <div className="flex items-center bg-[#2a2a2a] p-3 rounded">
            <MdOutlinePhone className="text-xl mr-3 text-green-400" />
            <input
              type="text"
              name="phone"
              placeholder="03XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <div className="flex items-start bg-[#2a2a2a] p-3 rounded">
            <MdMessage className="text-xl mr-3 text-blue-400 mt-1" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="bg-transparent outline-none w-full text-white"
            ></textarea>
          </div>
          
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold text-white">
              Send Message
            </button>
          

        </form>
      </div>
    </div>
  );
};

export default Contact;
