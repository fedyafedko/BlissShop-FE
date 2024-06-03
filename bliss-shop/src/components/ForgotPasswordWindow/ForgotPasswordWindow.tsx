import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { useForm } from "react-hook-form";
import ForgotPasswordFormValidation from "../../validation/ForgotPasswordFormValidation";

export interface ForgotPasswordForm {
    email: string;
}

const ForgotPasswordWindow = () => {
    const [open, setOpen] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordForm>({
        resolver: yupResolver(ForgotPasswordFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleForgotPassword = async (data: ForgotPasswordForm) => {
        console.log(`Forgot Password: ${data}`);
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '450px',
                        backgroundColor: 'background.paper',
                        boxShadow: 24,
                        gap: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '40px',
                    }}>
                        <CloseIcon onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            cursor: 'pointer',
                        }}/>
                        <Typography id="transition-modal-title" variant="h5" component="h2"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                            Forgot<br />Your Password?
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                color="secondary"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message || ' '}
                                sx={{
                                    width: '300px',
                                }} />
                            <Button 
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit(handleForgotPassword)}
                            sx={{
                                color: 'primary.dark',
                                width: '300px',
                                textTransform: 'none',
                            }}>
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Button
                onClick={handleOpen}
                sx={{
                    display: 'flex',
                    color: 'primary.light',
                    alignSelf: 'flex-end',
                    padding: '0px',
                    textTransform: 'none',
                    ":hover": {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                    }
                }}>
                Forgot password?
            </Button>
        </>
    );
}

export default ForgotPasswordWindow;