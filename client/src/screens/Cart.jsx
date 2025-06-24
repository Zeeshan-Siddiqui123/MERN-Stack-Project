import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateCart, removeFromCart, clearCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !userId) {
      message.warning("Please login to view cart");
      navigate('/login');
    }
  }, [loading, userId, navigate]);

  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    setTotal(subtotal);
  }, [cart]);

  const increase = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  const decrease = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateCart(updated);
    }
  };

  const deleteItem = (product) => {
    Modal.confirm({
      title: 'Remove Item',
      content: `Remove ${product.title} from cart?`,
      onOk() {
        removeFromCart(product.id);
      }
    });
  };

  const handleClearCart = () => {
    Modal.confirm({
      title: 'Clear Cart',
      content: 'Are you sure you want to remove all items?',
      okType: 'danger',
      onOk: async () => {
        await clearCart(); // clears from frontend and backend
      }
    });
  };

  if (loading) return null;

  return (
    <div className="w-full mt-22 px-4 py-6 bg-[#121212] text-white shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">🛒 Your Cart</h1>
        <p className="text-gray-400">Items you've added</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-400">Your cart is empty</h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart.map((product, index) => (
              <div key={product.id} className="bg-[#1f1f1f] p-4 rounded-lg shadow">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/images/uploads/${product.file}`}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-gray-400">Rs: {product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => decrease(index)} className="bg-gray-700 px-2 py-1 rounded">−</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increase(index)} className="bg-gray-700 px-2 py-1 rounded">+</button>
                    <p className="text-green-400 font-bold">
                      Rs: {(product.quantity * product.price).toFixed(2)}
                    </p>
                    <MdDelete onClick={() => deleteItem(product)} className="text-red-400 cursor-pointer" size={22} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">💳 Summary</h2>
            <div className="bg-[#1f1f1f] p-6 rounded">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rs: {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-400">Rs: {total.toFixed(2)}</span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <Link to="/payment">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Pay
                  </button>
                </Link>
                <button onClick={handleClearCart} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
