import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import coinsAPI from "./coinsAPI";

const initialState = {
  loading: true,
  errors: null,
};

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (params, { rejectWithValue, getState }) => {
    try {
      const response = await coinsAPI.getLatestListing(params);

      return response.data;
    } catch (err) {
      const error = err; // cast the error for access
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

const coinsAdapter = createEntityAdapter({
  selectId: (item) => item.symbol,
});

export const coinsSlice = createSlice({
  name: "coins",
  initialState: coinsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state, action) => {
      state.errors = null;
      state.loading = true;
    });
    builder.addCase(fetchCoins.fulfilled, (state, { payload: coins }) => {
      state.loading = false;
      coinsAdapter.setAll(state, coins.data);
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      console.log(action);
      if (action.payload) {
        //   state.errors = action.payload?.errors;
      }
    });
  },
});

export const coinsSelectors = coinsAdapter.getSelectors((state) => state.coins);

export default coinsSlice.reducer;
