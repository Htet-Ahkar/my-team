// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface UserInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const initialState: UserInterface = {
  user: null, // { username: 'John' }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = { userName: action.payload };
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
