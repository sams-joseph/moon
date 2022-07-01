import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@moon/features/Auth/authSlice";
import coinsReducer from "@moon/features/Coins/coinsSlice";

export const store = configureStore({
  reducer: { auth: authReducer, coins: coinsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
