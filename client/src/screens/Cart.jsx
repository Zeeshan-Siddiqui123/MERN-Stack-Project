// screens/Cart.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCart,
  updateCart,
  saveCart,
  removeFromCart,
  clearCartBackend
} from '../features/cart/cartSlice';
import { MdDelete } from 'react-icons/md';
import { Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../API';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const status = useSelector(state => state.cart.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      message.warning("Please login to view cart");
      navigate('/login');
    } else {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    setTotal(subtotal);
  }, [cart]);

  const increase = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(updateCart(updated));
    dispatch(saveCart(updated));
  };

  const decrease = (id) => {
    const updated = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(updateCart(updated));
    dispatch(saveCart(updated));
  };

  const deleteItem = (item) => {
    Modal.confirm({
      title: 'Remove Item',
      content: `Remove ${item.title} from cart?`,
      onOk: () => {
        const updated = cart.filter(i => i.id !== item.id);
        dispatch(updateCart(updated));
        dispatch(saveCart(updated));
      }
    });
  };

  const handleClearCart = () => {
    Modal.confirm({
      title: 'Clear Cart',
      content: 'Are you sure you want to remove all items?',
      okType: 'danger',
      onOk: () => {
        dispatch(clearCartBackend());
      }
    });
  };

  if (status === 'loading') {
    return <p className="text-white p-10">Loading cart...</p>;
  }

  return (
    <div className="w-full mt-22 px-4 py-6 bg-[#121212] text-white shadow-lg animate-slide-down ">
      <h2 className="text-3xl font-bold mb-4 text-center">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className='text-center'>Your cart is empty</p>
      ) : (
        <>
        <p className='text-center mb-8'>Items you've added</p>
          {cart.map((item, index) => (
            <div
              key={item.id || `${item.title}-${index}`}
              className="flex justify-between items-center mb-4 bg-[#1f1f1f] p-4 rounded"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`${API}/images/uploads/${item.file}`}
                  className="w-14 h-14 rounded"
                  alt={item.title}
                />
                <div>
                  <h4>{item.title}</h4>
                  <p>Rs: {item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => decrease(item.id)} className="bg-gray-700 px-2 py-1 rounded">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.id)} className="bg-gray-700 px-2 py-1 rounded">+</button>
                <p className="text-green-400 font-bold">Rs: {(item.price * item.quantity).toFixed(2)}</p>
                <MdDelete onClick={() => deleteItem(item)} className="text-red-400 cursor-pointer" size={22} />
              </div>
            </div>
          ))}
          {/* <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: Rs {total.toFixed(2)}</h3>
            <div className="flex justify-end gap-4 mt-4">
              <Link to="/payment">
                <button className="bg-blue-500 px-4 py-2 rounded">Pay</button>
              </Link>
              <button onClick={handleClearCart} className="bg-red-500 px-4 py-2 rounded">Clear Cart</button>
            </div>
          </div> */}

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
