import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import signInFormValidation from '../../validation/SignInFormValidation';
import ForgotPasswordWindow from '../ForgotPasswordWindow/ForgotPasswordWindow';
import Auth from '../../api/Auth';
import SignInRequest from '../../api/models/request/Auth/SignInRequest';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
import { useGoogleLogin } from '@react-oauth/google';
import LoadingButton from '@mui/lab/LoadingButton';

export interface SignIn {
    email: string;
    password: string;
}

const SignInForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const { notifyError, Notification } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignIn>({
        resolver: yupResolver(signInFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSignIn = async (form: SignIn) => {
        setLoading(true);
        const response = await Auth.signIn(form as SignInRequest);
        setLoading(false);

        if (response.success) {
            navigate('/');
        } else {
            notifyError(response.error ?? 'An error occurred')
        }
    };

    const handleGoogleSignIn = useGoogleLogin({
        onSuccess: async (codeResp: any) => {
            const response = await Auth.signInGoogle(codeResp.code);
            if (response === undefined) {
                navigate('/');
            }
            else {
                notifyError(response);
            }
        },
        flow: 'auth-code',
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            padding: '20px',
            width: '500px',
        }}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome back</Typography>
                <Typography variant="body1">
                    Don't have an account? <Link sx={{ color: 'secondary.dark' }} href="/sign-up">Register</Link>
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message || ' '}
                    sx={{ width: '100%' }} />
                <FormControl
                    sx={{ width: '100%' }}
                    variant="outlined"
                    color="secondary">
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        color="secondary"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message || ' '}
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
                    <ForgotPasswordWindow />
                </FormControl>
                <LoadingButton
                    variant="contained"
                    color="secondary"
                    loading={loading}
                    onClick={handleSubmit(handleSignIn)}
                    sx={{
                        width: '100%',
                        height: '50px',
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}>
                    Sign In
                </LoadingButton>
                <Button
                    startIcon={<GoogleIcon sx={{ width: '30px', height: '30px' }} />}
                    variant="contained"
                    color="secondary"
                    onClick={handleGoogleSignIn}
                    sx={{
                        backgroundColor: 'secondary.dark',
                        width: '100%',
                        height: '50px',
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}>
                    Continue with Google
                </Button>
            </Box>
        </Box>
    );
};

export default SignInForm;