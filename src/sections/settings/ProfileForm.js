import React, { useCallback } from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Alert, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FetchUserProfile, UpdateUserProfile } from "../../redux/slices/app";
import { RHFUploadAvatar } from "../../components/hook-form/RHFUpload";

const ProfileForm = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUserProfile());
    }, []);

    const { user } = useSelector((state) => state.app);

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
        name: "",
        about: "",
        avatar: "",
    };

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

    // call when user drop img file into web
    const handleDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file)
        });
        if (file) {
            setValue(
                "avatar",
                newFile,
                { shouldValidate: true },
                // when change avatar, the validation rule will check again
            );
        }
    }, [setValue]);

    // need S3 bucket, fix in redux/slices/app.js
    const onSubmit = async (data) => {
        try {
            // api submit
            console.log("Data", data);
            dispatch(UpdateUserProfile(data));
        } catch (error) {
            console.error(error);
            // reset();
            // setError("afterSubmit", {
            //     ...error,
            //     message: error.message,
            // });
        }
    };

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
};

export default ProfileForm;
