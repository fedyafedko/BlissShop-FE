import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import signUpFormValidation from '../../validation/SignUpFormValidation';
import { useGoogleLogin } from '@react-oauth/google';
import SignUpRequest from '../../api/models/request/Auth/SignUpRequest';
import SignUpGoogleRequest from '../../api/models/request/Auth/SignUpGoogleRequest';
import LoadingButton from '@mui/lab/LoadingButton';

interface SignUpFormProps {
    onSignUpComplete: (data: SignUpRequest) => void;
    onSignUpGoogleComplete: (data: SignUpGoogleRequest) => void;
};

export interface SignUp {
    email: string;
    password: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpComplete, onSignUpGoogleComplete }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [role, setRole] = React.useState('Buyer');
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUp>({
        resolver: yupResolver(signUpFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole((event.target as HTMLInputElement).value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSignUp = async (form: SignUp) => {
        setLoading(true);
        const data: SignUpRequest = { email: form.email, password: form.password, role: role };
        await onSignUpComplete(data);
        setLoading(false);
    };

    const handleGoogleSignUp = useGoogleLogin({
        onSuccess: async (codeResp: any) => {
            const data: SignUpGoogleRequest = { code: codeResp.code, role: role };
            await onSignUpGoogleComplete(data);
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
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome</Typography>
                <Typography variant="body1">Sign up to start shopping</Typography>
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
                </FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="user"
                    name="radio-buttons-group"
                    value={role}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Buyer" control={<Radio color="secondary" />} label="Buyer" />
                    <FormControlLabel value="Seller" control={<Radio color="secondary" />} label="Seller" />
                </RadioGroup>
                <LoadingButton
                    variant="contained"
                    color="secondary"
                    loading={loading}
                    onClick={handleSubmit(handleSignUp)}
                    sx={{
                        width: '100%',
                        height: '50px',
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}>
                    Sign Up
                </LoadingButton>
                <Button
                    startIcon={<GoogleIcon sx={{ width: '30px', height: '30px' }} />}
                    variant="contained"
                    color="secondary"
                    onClick={handleGoogleSignUp}
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

export default SignUpForm;