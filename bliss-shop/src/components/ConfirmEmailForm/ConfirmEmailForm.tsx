import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import confirmEmailValidation from "../../validation/ConfirmEmailFormValidation";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

interface ConfirmEmailProps {
    confirmEmail: (code: number) => void;
    resendEmailCode: () => void;
};

export interface ConfirmEmail {
    code: number;
}

const ConfirmEmailForm: React.FC<ConfirmEmailProps> = ({ confirmEmail, resendEmailCode }) => {
    const [loading, setLoading] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ConfirmEmail>({
        resolver: yupResolver(confirmEmailValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });

    const handleConfirmEmail = async (form: ConfirmEmail) => {
        setLoading(true);
        await confirmEmail(form.code);
        setLoading(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            padding: '20px',
            width: '500px',
        }}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Confirmed Your Email</Typography>
                <Typography variant="body1">Thank you for registering with BlissShop! To complete the registration process and activate your account, please verify your email address.</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                }}>
                    <TextField
                        id="code"
                        label="Code"
                        {...register('code')}
                        error={!!errors.code}
                        helperText={errors.code?.message || ' '}
                        variant="outlined"
                        color="secondary"
                        sx={{ width: '100%' }} />
                    <Link
                        onClick={resendEmailCode}
                        color="secondary"
                        sx={{
                            display: 'flex',
                            alignSelf: 'flex-end',
                            textTransform: 'none',
                            textDecoration: 'none',
                            "&:hover": {
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            },
                        }}>Resend code</Link>
                </Box>
                <LoadingButton
                    variant="contained"
                    loading={loading}
                    color="secondary"
                    onClick={handleSubmit(handleConfirmEmail)}
                    sx={{
                        width: '100%',
                        height: '50px',
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}>
                    Verify
                </LoadingButton>
            </Box>
        </Box>
    );
};
export default ConfirmEmailForm;