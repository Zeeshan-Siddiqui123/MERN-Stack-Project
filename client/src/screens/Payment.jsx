import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal, Spin } from 'antd';
import {
  FaShoppingBag, FaUser, FaMapMarkerAlt, FaCity,
  FaPhoneAlt, FaEnvelope, FaCreditCard
} from 'react-icons/fa';

const PaymentPage = () => {
  const location = useLocation();
  const orderedProduct = location.state?.product || null;

  const cart = useSelector(state => state.cart.items); // ✅ get cart from Redux

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderedProduct) {
      setProducts([{ ...orderedProduct, quantity: orderedProduct.quantity || 1 }]);
    } else {
      setProducts(cart);
    }
  }, [orderedProduct, cart]);

  const total = products.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/payments/initiate', {
        amount: total,
        orderId: 'ORD' + Date.now(),
        name,
        email,
        mobileNumber: mobile,
        address,
        city,
        cartItems: products,
      });
      window.location.href = res.data.paymentURL;
    } catch (err) {
      Modal.error({
        title: 'Payment Failed ❌',
        content: 'Something went wrong while initiating the payment. Please try again.',
        okText: 'Try Again',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-6 mt-22">
      <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-4xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <FaCreditCard /> Order Payment
        </h2>
        <div className="flex flex-row items-center justify-around flex-wrap gap-6">
          {/* Products Section */}
          <div className="w-full md:w-[45%] mb-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FaShoppingBag /> Products
            </h3>
            <div className="space-y-4">
              {products.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center justify-between bg-[#2a2a2a] rounded-md p-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/images/uploads/${item.file}`}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-gray-400 text-sm">
                        Rs {item.price} × {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <p className="text-green-400 font-bold text-lg">
                    Rs {(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* User Details Section */}
          <div className="w-full md:w-[45%] space-y-4">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 justify-center">
              <FaUser /> User Details
            </h3>

            <div>
              <label className="block mb-1 flex items-center gap-1">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
              />
            </div>

            <div>
              <label className="block mb-1 flex items-center gap-1">
                <FaMapMarkerAlt /> Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, Area"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
              />
            </div>

            <div>
              <label className="block mb-1 flex items-center gap-1">
                <FaCity /> City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Karachi"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
              />
            </div>

            <div>
              <label className="block mb-1 flex items-center gap-1">
                <FaPhoneAlt /> Mobile Number
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="03XXXXXXXXX"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
              />
            </div>

            <div>
              <label className="block mb-1 flex items-center gap-1">
                <FaEnvelope /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
              />
            </div>
          </div>
        </div>

        {/* Total & Payment Button */}
        <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4 border-gray-700">
          <span>Total</span>
          <span className="text-green-400">Rs {total.toFixed(2)}</span>
        </div>

        <Button
          type='primary'
          onClick={handlePayment}
          disabled={loading || !name || !email || !mobile || !address || !city}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          {loading ? <Spin /> : 'Proceed to Pay'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
