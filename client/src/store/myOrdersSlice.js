import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk(
  'myOrders/getOrders',
  async (_, { getState }) => {
    const {
      user: { token },
    } = getState();

    const { data: { orders } } = await axios.post(
      '/profile/myorders',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return orders;
  }
);

const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState: {
    orders: [],
  },
  reducers: {},
  extraReducers: {
    [getOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload;
    },
  },
});

export default myOrdersSlice.reducer;
