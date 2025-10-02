import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface wishListItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
    rating: {
       rate: number
    };
}

interface wishListState {
  items: wishListItem[];
}

const initialState: wishListState = {
  items: [],
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList(state, action: PayloadAction<wishListItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishList(state, action: PayloadAction<wishListItem>) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearWishList(state) {
      state.items = [];
    },
  },
});

export const { addToWishList, removeFromWishList, updateQuantity, clearWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
