import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    signupFail: (state, action) => {
      state.error = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log('User in authslice: ', action.payload);
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {signup,signupFail, logout, login, loginFail } = authSlice.actions;

export default authSlice.reducer;
