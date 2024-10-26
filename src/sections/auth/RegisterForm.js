import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Alert, Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import AuthSocial from "./AuthSocial";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });
  // auth test
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "vancuong@gmail.com",
    password: "cuongdeptrai",
  };
  const methods = useForm({
    resolver: yupResolver(RegisterForm),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;
  const onSubmit = async (data) => {
    try {
      // api submit
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", { ...error, message: error.message });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name={"firstName"} label="First Name"></RHFTextField>
          <RHFTextField name={"lastName"} label="Last Name"></RHFTextField>
        </Stack>
        <RHFTextField name={"email"} label="Email"></RHFTextField>
        <RHFTextField
          name={"password"}
          label="PassWord"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></RHFTextField>
      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "gray.800",
          },
        }}
      >
        Creat Accoun
      </Button>
      </Stack>
      <AuthSocial></AuthSocial>
    </FormProvider>
  );
};

export default RegisterForm;
