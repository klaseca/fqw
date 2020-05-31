import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import cabinetSlice from './cabinetSlice';
import servicesSlice from './servicesSlice';
import newOrderSlice from './newOrderSlice';
import myOrdersSlice from './myOrdersSlice';
import adminSlice from './adminSlice';

const reducer = {
  user: userSlice,
  cabinet: cabinetSlice,
  services: servicesSlice,
  newOrder: newOrderSlice,
  myOrders: myOrdersSlice,
  admin: adminSlice,
};

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware()],
});
