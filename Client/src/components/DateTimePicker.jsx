import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Box } from "@mui/material";

export default function CustomDateTimePicker({
  label,
  value = dayjs(),
  onChange,
  disabled,
}) {
  return (
    <Box sx={{ m: "8px 0" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={label}
          value={value}
          minDate={dayjs()}
          onChange={onChange}
          disabled={disabled}
          margin="dense"
        />
      </LocalizationProvider>
    </Box>
  );
}
