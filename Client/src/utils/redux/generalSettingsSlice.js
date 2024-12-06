import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridColorByPriority: false, // Toggle for grid color based on priority
};

const generalSettingsSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {
    toggleGridColorByPriority(state) {
      state.gridColorByPriority = !state.gridColorByPriority;
    },
    resetSettings(state) {
      state.gridColorByPriority = false;
    },
  },
});

export const { toggleGridColorByPriority, resetSettings } =
  generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
