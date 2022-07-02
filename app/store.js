import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@moon/features/Auth/authSlice";
import flashReducer from "@moon/features/Flash/flashSlice";
import coinsReducer from "@moon/features/Coins/coinsSlice";

export const store = configureStore({
  reducer: { auth: authReducer, flash: flashReducer, coins: coinsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
