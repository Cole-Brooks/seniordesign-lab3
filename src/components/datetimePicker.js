import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function BasicDateTimePicker(props) {
  const {deadLine, setDeadLine} = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DeadLine"
        readOnly={props.readOnly !== undefined}
        value={deadLine}
        onChange={(newValue) => {
          setDeadLine(newValue);
        }}
      />
    </LocalizationProvider>
  );
}