import { createSlice } from "@reduxjs/toolkit";

// initialState untuk state awal
const initialState = {
  token: null, // Token awal diatur ke null
  isLoggedIn: false, // Status login awal diatur ke false
  user: null, // Pengguna awal diatur ke null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setIsLoggedIn, setUser } = authSlice.actions;
export default authSlice.reducer;
