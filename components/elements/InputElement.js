import React from "react";

import { TextField } from "@mui/material";

function InputElement({
  disabled,
  id,
  label,
  type,
  defaultValue,
  value,
  touched,
  onBlur,
  onChange,
  error,
}) {
  return (
    <TextField
      fullWidth
      disabled={disabled}
      id={id}
      label={label}
      type={type}
      defaultValue={defaultValue}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      error={error && touched}
      helperText={error && touched ? error : null}
    />
  );
}

export default InputElement;
