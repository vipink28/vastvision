import { configureStore } from '@reduxjs/toolkit';
import tvReducer from '../features/tv/tvSlice';

export const store = configureStore({
  reducer: {
    tv: tvReducer,
  },
});
