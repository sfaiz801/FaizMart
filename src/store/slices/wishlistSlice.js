// Manages wishlist: toggle (add/remove), clear
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {
    toggleWishlist(state, { payload }) {
      const idx = state.items.findIndex(i => i.id === payload.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(payload);
    },
    removeFromWishlist(state, { payload }) {
      state.items = state.items.filter(i => i.id !== payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = s => s.wishlist.items;
export const selectWishlistCount = s => s.wishlist.items.length;
export const selectIsWishlisted  = id => s => s.wishlist.items.some(i => i.id === id);

export default wishlistSlice.reducer;
