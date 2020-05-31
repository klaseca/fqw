import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServices = createAsyncThunk(
  'newOrder/fetchServices',
  async () => {
    const {
      data: { services },
    } = await axios.get('/services');
    return services;
  }
);

export const createNewOrder = createAsyncThunk(
  'newOrder/createNewOrder',
  async (_, { getState }) => {
    try {
      const {
        newOrder: { services, ...payload },
        user: { token },
      } = getState();

      const { data } = await axios.post('/profile/neworder', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState: {
    services: [],
    orderItems: [
      {
        id: 'f4ret432423fshmg',
        serviceId: '',
        typeOfServices: [],
      },
    ],
    carChanged: '',
    isError: false,
    date: new Date().toString(),
    isSuccessRedirect: false,
  },
  reducers: {
    addOrderItem(state, { payload }) {
      state.orderItems.push({
        id: `f${(+new Date()).toString(16)}`,
        serviceId: '',
        typeOfServices: [],
      });
    },
    changeOrderItem(state, { payload }) {
      const index = state.orderItems.findIndex(
        (order) => order.id === payload.id
      );
      if (payload.isChangeServiseId) {
        state.orderItems[index].serviceId = payload.value;
      } else {
        state.orderItems[index].typeOfServices = payload.value;
      }
    },
    handleDateChange(state, { payload }) {
      state.date = payload;
    },
    deleteOrderItem(state, { payload }) {
      state.orderItems = state.orderItems.filter((item) => item.id !== payload);
    },
    changeCar(state, { payload }) {
      state.carChanged = payload;
    },
    changeIsSuccesRedirect(state, { payload }) {
      state.isSuccessRedirect = payload;
    },
    setIsError(state, { payload }) {
      state.isError = payload;
    },
  },
  extraReducers: {
    [fetchServices.fulfilled]: (state, { payload }) => {
      state.services = payload;
    },
    [createNewOrder.fulfilled]: (state, { payload }) => {
      state.isSuccessRedirect = true;
      state.orderItems = [
        {
          id: 'f4ret432423fshmg',
          serviceId: '',
          typeOfServices: [],
        },
      ];
      state.carChanged = '';
    },
  },
});

export const {
  addOrderItem,
  changeOrderItem,
  handleDateChange,
  deleteOrderItem,
  changeCar,
  setIsError,
  changeIsSuccesRedirect,
} = newOrderSlice.actions;

export default newOrderSlice.reducer;
