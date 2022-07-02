import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
  kind: "error",
};

export const flashSlice = createSlice({
  name: "flash",
  initialState,
  reducers: {
    showFlash: (state, { payload }) => {
      state.show = true;
      state.message = payload.message;
      state.kind = payload.kind;
    },
    clearFlash: (state) => {
      state.show = false;
      state.message = "";
      state.kind = "error";
    },
  },
  extraReducers: (builder) => {},
});

export const { showFlash, clearFlash } = flashSlice.actions;

export default flashSlice.reducer;
