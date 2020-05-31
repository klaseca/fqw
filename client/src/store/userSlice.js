import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const createConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchIsAuth = createAsyncThunk('user/fetchIsAuth', async (token) => {
  const {
    data: { user },
  } = await axios.get('/profile', createConfig(token));
  return { ...user, token };
});

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ path, values }, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await axios.post(path, values);
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWithToken = createAsyncThunk(
  'user/fetchWithToken',
  async (_, { getState }) => {
    const {
      user: { token },
    } = getState();

    const { data } = await axios.post(
      '/profile/cabinet',
      {},
      createConfig(token)
    );
    return data;
  }
);

export const updateData = createAsyncThunk(
  'user/updateData',
  async (user, { getState }) => {
    const {
      user: { token },
    } = getState();

    const {
      data: { user: userData },
    } = await axios.patch('/profile/updateuser', user, createConfig(token));
    return userData;
  }
);

export const addCar = createAsyncThunk(
  'user/addCar',
  async (car, { getState }) => {
    try {
      const {
        user: { token },
      } = getState();

      const {
        data: { car: carData },
      } = await axios.post('profile/addcar', { car }, createConfig(token));

      return carData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCar = createAsyncThunk(
  'user/updateCar',
  async (car, { getState }) => {
    try {
      const {
        cabinet: { carId },
        user: { token },
      } = getState();

      const {
        data: { car: carData },
      } = await axios.patch(
        'profile/updatecar',
        { carId, car },
        createConfig(token)
      );

      return carData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCar = createAsyncThunk(
  'user/deleteCar',
  async (id, { getState }) => {
    try {
      const {
        user: { token },
      } = getState();

      const {
        data: { carId },
      } = await axios.delete('profile/deletecar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { carId: id },
      });

      return carId;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    token: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isFetching: true,
    cars: [],
    carTitles: {
      brand: 'Марка',
      model: 'Модель',
      stateNumber: 'Гос. номер',
      yearOfIssue: 'Год выпуска',
    },
    orders: [],
    orderTitles: {
      dateStart: 'Дата заказа',
      status: 'Статус заказа',
      stateNumber: 'Гос. номер',
      countServices: 'Количество услуг',
    },
    error: {
      isError: false,
      message: '',
    },
  },
  reducers: {
    userLogout(state) {
      localStorage.removeItem('token');
      state.isAuth = false;
      state.token = '';
      state.userId = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phone = '';
      state.cars = [];
      state.orders = [];
    },
    resetError(state) {
      state.error = {
        isError: false,
        message: '',
      }
    },
    setIsFetching(state, { payload }) {
      state.isFetching = payload;
    },
  },
  extraReducers: {
    [fetchIsAuth.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isAuth: true,
        isFetching: false,
      };
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = {
        isError: true,
        message: payload.message,
      }
    },
    [fetchWithToken.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    [updateData.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
      };
    },
    [updateCar.fulfilled]: (state, { payload }) => {
      const carIndex = state.cars.findIndex(
        (car) => car.carId === payload.carId
      );
      state.cars[carIndex] = payload;
    },
    [deleteCar.fulfilled]: (state, { payload }) => {
      const cars = state.cars.filter((car) => car.carId !== payload);
      state.cars = cars;
    },
    [addCar.fulfilled]: (state, { payload }) => {
      state.cars.push(payload);
    },
  },
});

export const { userLogout, resetError, setIsFetching } = userSlice.actions;

export default userSlice.reducer;
