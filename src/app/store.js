import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/product/productsSlice';

export default configureStore({
  reducer: {
    products: productsReducer
  },
});
