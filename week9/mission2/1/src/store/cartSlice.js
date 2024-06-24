// src/store/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  showModal: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create an async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const response = await axios.get('http://localhost:8080/musics');
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.amount++;
      }
    },
    decrease(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.amount--;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
    calculateTotals(state) {
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.amount, 0);
      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.amount, 0);
    },
    toggleModal(state) {
      state.showModal = !state.showModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { increase, decrease, clearCart, calculateTotals, toggleModal } = cartSlice.actions;
export default cartSlice.reducer;
