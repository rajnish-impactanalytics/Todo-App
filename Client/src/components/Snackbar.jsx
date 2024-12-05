import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../utils/redux/snackbarSlice";
import Alert from "@mui/material/Alert";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SimpleSnackbar() {
  const dispatch = useDispatch();

  const { message, type, isVisible } = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideSnackbar());
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={isVisible}
        autoHideDuration={5000}
        onClose={() => dispatch(hideSnackbar())}
        action={action}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
