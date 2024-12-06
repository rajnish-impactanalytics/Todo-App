import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import modalReducer from './modalSlice';
import snackbarSlice from './snackbarSlice';
import generalSettingsReducer from "./generalSettingsSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    modal: modalReducer,
    snackbar: snackbarSlice,
    generalSettings: generalSettingsReducer,
  },
});
