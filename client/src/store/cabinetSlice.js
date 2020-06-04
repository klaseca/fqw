import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrder = createAsyncThunk(
  'cabinet/getOrder',
  async (orderId, { getState }) => {
    try {
      const {
        user: { token },
      } = getState();

      const {
        data: { order },
      } = await axios.post(
        '/profile/getorder',
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return order;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getReportData = createAsyncThunk(
  'cabinet/getReportData',
  async (reportData, { getState }) => {
    try {
      const {
        user: { token },
      } = getState();

      const { data } = await axios.post(
        '/profile/createreport',
        { ...reportData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const cabinetSlice = createSlice({
  name: 'cabinet',
  initialState: {
    isModalProfile: false,
    isModalCars: false,
    isModalDelete: false,
    isModalOrder: false,
    carId: -1,
    orderId: -1,
    user: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    car: {
      brand: '',
      model: '',
      stateNumber: '',
      yearOfIssue: '',
    },
    order: {
      orderId: '',
      dateStart: '',
      car: '',
      status: '',
      price: '',
      orderServices: [],
    },
    reportInfo: {
      isFulfield: false,
      message: '',
      reportData: {},
    },
  },
  reducers: {
    setModal(state, { payload }) {
      state[payload.name] = payload.isOpen;
    },
    setUserData(state, { payload }) {
      state.user = { ...payload };
    },
    handleChangeUser(state, { payload }) {
      state.user[payload.name] = payload.value;
    },
    setCarId(state, { payload }) {
      state.carId = payload;
    },
    setOrderId(state, { payload }) {
      state.orderId = payload;
    },
    setCarData(state, { payload }) {
      state.car = { ...payload };
    },
    resetCarData(state) {
      state.car.brand = '';
      state.car.model = '';
      state.car.stateNumber = '';
      state.car.yearOfIssue = '';
    },
    handleChangeCar(state, { payload }) {
      state.car[payload.name] = payload.value;
    },
    resetReportInfo(state) {
      state.reportInfo = {
        ...state.reportInfo,
        isFulfield: false,
        message: '',
      }
    }
  },
  extraReducers: {
    [getOrder.fulfilled]: (state, { payload }) => {
      state.order = payload;
    },
    [getReportData.fulfilled]: (state, { payload }) => {
      if (payload.message) {
        state.reportInfo = {
          ...state.reportInfo,
          isFulfield: true,
          message: payload.message,
        };
      } else {
        state.reportInfo = {
          ...state.reportInfo,
          isFulfield: true,
          reportData: payload.reportData,
        };
      }
    },
  },
});

export const {
  setModal,
  setUserData,
  handleChangeUser,
  handleChangeCar,
  setCarId,
  setOrderId,
  setCarData,
  resetCarData,
  resetReportInfo,
} = cabinetSlice.actions;

export default cabinetSlice.reducer;
