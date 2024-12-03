import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

function SnackMessage({ msg, variant }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("");
  };

  const handleClickVariant = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  handleClickVariant(msg, variant);

  return <React.Fragment></React.Fragment>;
}

export default function SnackMessageProvider({ msg, variant }) {
  return (
    <SnackbarProvider maxSnack={1}>
      <SnackMessage msg={msg} variant={variant} />
    </SnackbarProvider>
  );
}
