import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './screens/CartContext';

const PaymentPage = () => {
  const location = useLocation();
  const orderedProduct = location.state?.product || null;
  const { cart } = useContext(CartContext);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Check if coming from 'Order Now' (single product) or Cart (multiple products)
  useEffect(() => {
    if (orderedProduct) {
      setProducts([{ ...orderedProduct, quantity: orderedProduct.quantity || 1 }]);
    } else {
      // Get from cart context
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
        mobileNumber: mobile,
        email,
        cartItems: products,
      });
      window.location.href = res.data.paymentURL;
    } catch (err) {
      alert("Payment initiation failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-6">
      <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-4xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">💳 Order Payment</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">🛍️ Products</h3>
          <div className="space-y-4">
            {products.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-[#2a2a2a] rounded-md p-3">
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

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1">📱 Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="03XXXXXXXXX"
              className="w-full p-2 rounded bg-[#2a2a2a] text-white"
            />
          </div>

          <div>
            <label className="block mb-1">📧 Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full p-2 rounded bg-[#2a2a2a] text-white"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4 border-gray-700">
          <span>Total</span>
          <span className="text-green-400">Rs {total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !mobile || !email}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          {loading ? 'Redirecting...' : 'Proceed to Pay'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
