import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Alert, Avatar, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FetchUserProfile, UpdateUserProfile } from "../../redux/slices/app";
import { RHFUploadAvatar } from "../../components/hook-form/RHFUpload";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);

  const { user } = useSelector((state) => state.app);

<<<<<<< HEAD
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  // old schema
  // const loginSchema = Yup.object().shape({
  //     name: Yup.string().required("Name is required"),
  //     about: Yup.string().required("About is required"),
  //     avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  // });

  const defaultValues = {
    // ERROR: can not get data from user
    firstName: user?.firstName,
    about: user?.about,
    avatar: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
  };
=======
    const ProfileSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required").nullable(true),
        lastName: Yup.string().required("Last name is required").nullable(true),
        about: Yup.string().required("About is required").nullable(true),
        avatar: Yup.string().required("Avatar is required").nullable(true),
        avatar_file: Yup.mixed().required("Avatar is required").nullable(true),
    });

    const defaultValues = {
        // ERROR: can not get data from user
        firstName: null,
        lastName: null,
        about: null,
        avatar: null,
        avatar_file: null,
    };
>>>>>>> feature/FileMess

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch(); // get all values from the form

<<<<<<< HEAD
  // need S3 bucket, fix in redux/slices/app.js
  const onSubmit = async (data) => {
    try {
      // api submit
      console.log("Data", data);
      dispatch(
        UpdateUserProfile({
          firstName: data?.firstName,
          about: data?.about,
          avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
      // reset();
      // setError("afterSubmit", {
      //     ...error,
      //     message: error.message,
      // });
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
=======
    // call when user drop img file into web
    const handleDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        console.log(file);
        const preview_file = Object.assign(file, {
            preview: URL.createObjectURL(file)
        });
        if (file) {
            setValue(
                "avatar",
                preview_file,
                { shouldValidate: true },
            );
            setValue(
                "avatar_file",
                file,
                { shouldValidate: true },
            );
        }
    }, [setValue]);
>>>>>>> feature/FileMess

      setFile(file);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

<<<<<<< HEAD
      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />
        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField
          multiline
          rows={4}
          maxRows={5}
          name="about"
          label="About"
        />
        <Stack direction={"row"} justifyContent="end">
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
=======
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
                <RHFUploadAvatar 
                    name="avatar" 
                    maxSize={3145728} 
                    onDrop={handleDrop}
                    avatar_link={user.avatar} 
                />
                <RHFTextField
                    helperText={"This name is visible to your contacts"}
                    name="firstName"
                    label="First Name"
                    user_value={user.firstName}
                />
                <RHFTextField
                    helperText={"This name is visible to your contacts"}
                    name="lastName"
                    label="Last Name"
                    user_value={user.lastName}
                />
                <RHFTextField
                    multiline
                    rows={4}
                    maxRows={5}
                    name="about"
                    label="About"
                    user_value={user.about}
                />
                <Stack direction={"row"} justifyContent="end">
                    <Button
                        color="primary"
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={()=>{console.log("click save")}}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
>>>>>>> feature/FileMess
};

export default ProfileForm;
