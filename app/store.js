import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@moon/features/Auth/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
