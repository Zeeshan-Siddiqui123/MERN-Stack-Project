// features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const userId = localStorage.getItem('userId');
  const res = await axios.get(`http://localhost:3000/api/cart/${userId}`);
  return res.data.cart || [];
});

export const saveCart = createAsyncThunk('cart/saveCart', async (cart) => {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error("No userId found");
  await axios.post(`http://localhost:3000/api/cart/${userId}`, { cart });
  return cart;
});

export const clearCartBackend = createAsyncThunk('cart/clearCartBackend', async () => {
  const userId = localStorage.getItem('userId');
  await axios.delete(`http://localhost:3000/api/cart/${userId}`);
  return [];
});

// ✅ NEW: Add to cart and sync backend
export const addToCartAndSave = (product) => (dispatch, getState) => {
  const normalized = {
    ...product,
    id: product._id || product.id,
    quantity: 1,
  };

  dispatch(addToCart(normalized));

  const { cart } = getState();
  dispatch(saveCart(cart.items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCart: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(saveCart.fulfilled, () => {})
      .addCase(clearCartBackend.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
