import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useState } from "react";

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};
export default function RHFTextField({name, helperText, user_value, ...other}) {
  const { control } = useFormContext();
  const [typing, setTyping] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          InputLabelProps={{shrink: true}}
          value={
            typing ? field.value : (user_value ? user_value : "")
          }
          onMouseEnter={() => setTyping(true)}
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
