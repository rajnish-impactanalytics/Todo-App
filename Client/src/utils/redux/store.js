import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import modalReducer from './modalSlice';
import snackbarSlice from './snackbarSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    modal: modalReducer,
    snackbar: snackbarSlice,
  },
});
