import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "", // The message to display
  type: "info", // Snackbar type: "success", "error", "warning", "info"
  isVisible: false, // Whether the snackbar is visible
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type || "info"; // Default type is "info"
      state.isVisible = true;
    },
    hideSnackbar: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
