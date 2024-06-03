import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import signInFormValidation from '../../validation/SignInFormValidation';
import ForgotPasswordWindow from '../ForgotPasswordWindow/ForgotPasswordWindow';

export interface SignIn {
    email: string;
    password: string;
}

const SignInForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
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
    const handleSignUp = async (form: SignIn) => {
        console.log(`Sign In: ${form}`);
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
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome back</Typography>
                <Typography variant="body1">Sign in to start shopping</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
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
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit(handleSignUp)}
                    sx={{
                        width: '100%',
                        height: '50px',
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}>
                    Sign In
                </Button>
                <Button
                    startIcon={<GoogleIcon sx={{ width: '30px', height: '30px' }} />}
                    variant="contained"
                    color="secondary"
                    sx={{
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