import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, TextField, FormControl, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import resetPasswordValidation from "../../validation/ResetPasswordValidation";
import Auth from "../../api/Auth";
import ResetPasswordRequest from "../../api/models/request/Auth/ResetPasswordRequest";
import useNotification from "../../hooks/useNotification";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export interface ResetPassword {
    newPassword: string;
    confirmPassword: string;
}

const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { email, token } = useParams<{ email: string, token: string }>();
    const navigate = useNavigate();
    const { notifyError, notifySuccess, Notification } = useNotification();
    const [loading, setLoading] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPassword>({
        resolver: yupResolver(resetPasswordValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleResetPassword = async (form: ResetPassword) => {
        setLoading(true);
        const request: ResetPasswordRequest = {
            resetToken: encodeURIComponent(token || ''),
            email: email || '',
            newPassword: form.newPassword,
        };
        const response = await Auth.resetPassword(request);
        setLoading(false);
        if (response === undefined) {
            navigate('/sign-in');
        }
        else {
            notifyError(response);
        }
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
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Reset Password</Typography>
                <Typography variant="body1"> Please enter your new password below. Your new password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.</Typography>
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
                    width: '100%',
                    gap: '10px',
                }}>
                    <FormControl
                        sx={{ width: '100%' }}
                        variant="outlined"
                        color="secondary">
                        <TextField
                            id="newPassword"
                            label="New Password"
                            variant="outlined"
                            color="secondary"
                            type={showPassword ? 'text' : 'password'}
                            {...register('newPassword')}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message || ' '}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl
                        sx={{ width: '100%' }}
                        variant="outlined"
                        color="secondary">
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            variant="outlined"
                            color="secondary"
                            type={showPassword ? 'text' : 'password'}
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message || ' '}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </Box>
                <LoadingButton
                    variant="contained"
                    onClick={handleSubmit(handleResetPassword)}
                    loading={loading}
                    color="secondary"
                    sx={{
                        width: '100%',
                        height: '50px',
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}>
                    Reset Password
                </LoadingButton>
            </Box>
        </Box>
    );
};

export default ResetPasswordForm;