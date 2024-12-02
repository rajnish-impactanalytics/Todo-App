import * as React from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

function SnackMessage() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("");
  };

  const handleClickVariant = (msg, variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant(msg, variant)}>
        Show success snackbar
      </Button>
    </React.Fragment>
  );
}

export default function SnackMessageProvider() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SnackMessage />
    </SnackbarProvider>
  );
}
