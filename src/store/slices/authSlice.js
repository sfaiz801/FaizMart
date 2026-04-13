// Handles user authentication state
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isLoggedIn: false },
  reducers: {
    loginUser(state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUser(state, { payload }) {
      state.user = { ...state.user, ...payload };
    },
  },
});

export const { loginUser, logoutUser, updateUser } = authSlice.actions;

export const selectUser      = s => s.auth.user;
export const selectIsLoggedIn = s => s.auth.isLoggedIn;

export default authSlice.reducer;
