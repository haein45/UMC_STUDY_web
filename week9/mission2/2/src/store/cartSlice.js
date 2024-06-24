import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk action to fetch cartItems from the server
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    try {
      const response = await fetch('http://localhost:8080/musics');
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
    showModal: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    increase: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.amount += 1;
    },
    decrease: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item.amount > 1) {
        item.amount -= 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalQuantity = 0;
      state.cartItems.forEach((item) => {
        totalAmount += item.price * item.amount;
        totalQuantity += item.amount;
      });
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
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
