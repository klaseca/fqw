import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const createConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const checkValidToken = createAsyncThunk(
  'admin/checkValidToken',
  async (token) => {
    const {
      data: { user },
    } = await axios.get('/admin', createConfig(token));
    return { ...user, token };
  }
);

export const loginAdmin = createAsyncThunk(
  'admin/loginAdmin',
  async (values) => {
    const {
      data: { user },
    } = await axios.post('/admin/login', values);
    return user;
  }
);

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (_, { getState }) => {
    const {
      admin: { token },
    } = getState();

    const {
      data: { users },
    } = await axios.post('/admin/getusers', {}, createConfig(token));
    return users;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ statusId, orderId }, { getState }) => {
    const {
      admin: { token },
    } = getState();

    const {
      data: { orderId: id, title },
    } = await axios.patch(
      'admin/updateorderstatus',
      { orderId, statusId },
      createConfig(token)
    );

    return { id, title, statusId };
  }
);

export const getOrders = createAsyncThunk(
  'admin/getOrders',
  async (options, { getState }) => {
    const {
      admin: { token },
    } = getState();

    const {
      data: { orders },
    } = await axios.post('/admin/getorders', { options }, createConfig(token));
    return orders;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuth: false,
    token: '',
    adminId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passport: '',
    users: [],
    orders: [],
    service: {
      title: '',
      description: '',
      typeOfServices: [],
    },
    isModal: false,
    isFetchingAdmin: true,
  },
  reducers: {
    adminLogout(state, action) {
      localStorage.removeItem('atoken');
      state.isAuth = false;
      state.token = '';
      state.userId = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phone = '';
      state.passport = '';
      state.users = [];
      state.orders = [];
    },
    setModal(state, { payload }) {
      state[payload.name] = payload.isOpen;
    },
    setService(state, { payload }) {
      state.service = payload;
    },
    setIsFetchingAdmin(state, { payload }) {
      state.isFetchingAdmin = payload;
    },
  },
  extraReducers: {
    [checkValidToken.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isAuth: true,
        isFetchingAdmin: false,
      };
    },
    [loginAdmin.fulfilled]: (state, { payload }) => {
      localStorage.setItem('atoken', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload;
    },
    [updateOrderStatus.fulfilled]: (state, { payload }) => {
      const index = state.orders.findIndex(
        (order) => order.orderId === payload.id
      );
      state.orders[index].status = payload.title;
      state.orders[index].statusId = payload.statusId;
    },
  },
});

export const {
  adminLogout,
  setModal,
  setService,
  setIsFetchingAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
