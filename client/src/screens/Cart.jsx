import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // ✅ Load cart for current user
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        message.warning("Please login to view your cart");
        return navigate('/login');
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/cart/${userId}`);
        setCart(res.data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        message.error("Failed to load cart");
      }
    };

    fetchCart();
  }, [navigate]);

  useEffect(() => {
    const subtotal = cart.reduce((acc, product) => {
      return acc + product.price * (product.quantity || 1);
    }, 0);
    setTotal(subtotal);
  }, [cart]);

  const increase = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
    syncCart(updatedCart);
  };

  const decrease = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      syncCart(updatedCart);
    }
  };

  const deleteItem = (product) => {
    Modal.confirm({
      title: 'Remove from Cart',
      content: `Remove ${product.title}?`,
      okText: 'Remove',
      cancelText: 'Cancel',
      onOk() {
        const updated = cart.filter(p => p.id !== product.id);
        setCart(updated);
        syncCart(updated);
      }
    });
  };

  const confirmClearCart = () => {
    Modal.confirm({
      title: 'Clear Cart',
      content: 'Are you sure you want to remove all items?',
      okType: 'danger',
      onOk: async () => {
        setCart([]);
        const userId = localStorage.getItem('userId');
        if (userId) {
          await axios.delete(`http://localhost:3000/api/cart/${userId}`);
        }
      }
    });
  };

  const syncCart = async (updatedCart) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await axios.post(`http://localhost:3000/api/cart/${userId}`, {
          cart: updatedCart
        });
      } catch (err) {
        console.error("Cart sync failed:", err);
      }
    }
  };

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
                <button onClick={confirmClearCart} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
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
