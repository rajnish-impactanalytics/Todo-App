import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "create", // Default mode
  isOpen: false, // Tracks whether the modal is open
  formState: {
    title: "",
    description: "",
    dueDate: null,
    priority: "None",
    createdAt: null, // Only applicable in "view" mode
    currentState: null, // Only applicable in "view" mode
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { mode = "create", data = {} } = action.payload;
      state.isOpen = true;
      state.mode = mode;

      // Update form state based on the mode and data
      if (mode === "edit" || mode === "view") {
        state.formState = {
          ...state.formState,
          ...data,
          createdAt: mode === "view" ? data.createdAt : null,
          currentState: mode === "view" ? data.currentState : null,
        };
      } else {
        state.formState = {
          title: "",
          description: "",
          dueDate: null,
          priority: "None",
          createdAt: null,
          currentState: null,
        };
      }
    },
    closeModal: (state, payload) => {
      state.isOpen = false;
      if (payload.clearData) {
        state.mode = "create"; // Reset to default mode
        state.formState = { ...initialState.formState }; // Clear the form state
      }
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      if (state.mode === "create" || state.mode === "edit") {
        state.formState[field] = value; // Update only allowed fields in "create" and "edit" mode
      }
    },
  },
});

export const { openModal, closeModal, updateField } = modalSlice.actions;
export default modalSlice.reducer;