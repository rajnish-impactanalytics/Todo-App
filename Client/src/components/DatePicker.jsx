import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../constants/globalConstants";

export default function BasicDatePicker({
  label = "DatePicker",
  value,
  onChange,
  disabled,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={dayjs(value)}
          format={DEFAULT_DATE_FORMAT}
          onChange={onChange}
          disabled={disabled}
          minDate={dayjs()}
          margin="dense"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
