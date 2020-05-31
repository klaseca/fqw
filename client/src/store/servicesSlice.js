import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const createConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const {
      data: { services },
    } = await axios.get('/services');
    return services;
  }
);

export const updateServices = createAsyncThunk(
  'services/updateServices',
  async (options, { getState }) => {
    const {
      admin: { token },
    } = getState();

    const {
      data: { updateService, updateTypeOfServices },
    } = await axios.patch(
      '/admin/updateservices',
      { options },
      createConfig(token)
    );
    return { ...updateService, typeOfServices: updateTypeOfServices };
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
  },
  reducers: {},
  extraReducers: {
    [fetchServices.fulfilled]: (state, { payload }) => {
      state.services = payload;
    },
    [updateServices.fulfilled]: (state, { payload }) => {
      const index = state.services.findIndex(
        (service) => service.serviceId === payload.serviceId
      );
      if (index !== -1) {
        state.services[index] = { ...payload };
      } else {
        state.services = [{ ...payload }, ...state.services];
      }
    },
  },
});

export default servicesSlice.reducer;
