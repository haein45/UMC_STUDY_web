import { createSlice } from '@reduxjs/toolkit';
import cartItems from './constants/cartItems';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: cartItems,
  },
  reducers: {
    increase: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { increase, decrease, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
