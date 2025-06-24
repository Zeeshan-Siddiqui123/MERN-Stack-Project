import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  // 👉 Load cart from backend on login
  useEffect(() => {
    const uid = localStorage.getItem('userId');
    setUserId(uid);

    if (uid) {
      axios.get(`http://localhost:3000/api/cart/${uid}`)
        .then(res => setCart(res.data.cart || []))
        .catch(err => console.error('Error loading cart:', err));
    } else {
      setCart([]);
    }
  }, [localStorage.getItem('userId')]);

  // 👉 Sync to backend on change
  useEffect(() => {
    if (userId && cart.length >= 0) {
      axios.post(`http://localhost:3000/api/cart/${userId}`, { cart })
        .catch(err => console.error('Error saving cart:', err));
    }
  }, [cart, userId]);

  const addToCart = (product) => {
    const id = product._id || product.id;
    setCart(prev => {
      const exists = prev.find(item => item.id === id);
      if (exists) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, id, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const clearCart = async () => {
    setCart([]); // frontend
    const uid = localStorage.getItem('userId');
    if (!uid) return;

    try {
      await axios.delete(`http://localhost:3000/api/cart/${uid}`); // backend
    } catch (err) {
      console.error('Error clearing cart from backend:', err);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
