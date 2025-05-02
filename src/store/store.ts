import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./user/user-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
