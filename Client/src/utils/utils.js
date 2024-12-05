import { showSnackbar } from "../utils/redux/snackbarSlice";

export const delaySimulation = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const displaySnackMessage = (dispatch, message, type) => {
  dispatch(
    showSnackbar({
      message: message,
      type: type,
    })
  );
};
