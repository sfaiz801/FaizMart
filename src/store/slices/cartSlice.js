// Handles all cart operations: add, remove, update qty, apply coupon
import { createSlice } from '@reduxjs/toolkit';

const COUPONS = { SAVE10: 10, SAVE20: 20, FLAT50: 50 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], coupon: null, discount: 0 },
  reducers: {
    addToCart(state, { payload }) {
      const found = state.items.find(i => i.id === payload.id);
      if (found) found.quantity += 1;
      else state.items.push({ ...payload, quantity: 1 });
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter(i => i.id !== payload);
    },
    updateQty(state, { payload: { id, qty } }) {
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      if (qty <= 0) state.items = state.items.filter(i => i.id !== id);
      else item.quantity = qty;
    },
    applyCoupon(state, { payload }) {
      const code = payload.trim().toUpperCase();
      const disc = COUPONS[code];
      if (disc) { state.coupon = code; state.discount = disc; }
      else { state.coupon = null; state.discount = 0; }
    },
    clearCart(state) {
      state.items = []; state.coupon = null; state.discount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQty, applyCoupon, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems    = s => s.cart.items;
export const selectCartCount    = s => s.cart.items.reduce((a, i) => a + i.quantity, 0);
export const selectCartSubtotal = s => s.cart.items.reduce((a, i) => a + i.price * i.quantity, 0);
export const selectDiscount     = s => s.cart.discount;
export const selectCoupon       = s => s.cart.coupon;

export default cartSlice.reducer;
