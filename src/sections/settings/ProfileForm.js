import React, { useCallback } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import {
    Alert,
    Button,
    Stack,
} from "@mui/material";

const ProfileForm = () => {
    const loginSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().required("About is required"),
        avatarUrl: Yup.string().required("Avatar is required").nullable(true),
    });

    const defaultValues = {
        name: "",
        about: "",
    };

    const methods = useForm({
        resolver: yupResolver(loginSchema),
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
                "avatarUrl",
                newFile,
                { shouldValidate: true },
                // when change avatar, the validation rule will check again
            );
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            // api submit
            console.log("Data", data);
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && (
                        <Alert severity="error">{errors.afterSubmit.message}</Alert>
                    )}
                    <RHFTextField name="name" label="Name" helperText={"This name is visible to your contacts"} />
                    <RHFTextField multiline rows={3} maxRows={5} name="about" label="About" />
                </Stack>
                <Stack direction={"row"} justifyContent="end">
                    <Button color="primary" size="large" type="submit" variant="outlined">Save</Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default ProfileForm;
