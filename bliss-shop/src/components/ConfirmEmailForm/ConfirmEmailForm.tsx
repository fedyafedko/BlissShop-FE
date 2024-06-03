import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import confirmEmailValidation from "../../validation/ConfirmEmailFormValidation";

interface ConfirmEmailProps {
    onComplete: () => void;
};

export interface ConfirmEmail {
    code: number;
}


const ConfirmEmailForm: React.FC<ConfirmEmailProps> = ({ onComplete }) => {
    const [confirmEmailComplete, setConfirmEmailComplete] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ConfirmEmail>({
        resolver: yupResolver(confirmEmailValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });
    
    const handleConfirmEmail = () => {
        setConfirmEmailComplete(true);
    };

    useEffect(() => {
        if (confirmEmailComplete) {
            console.log('Sign Up Complete');
            onComplete();
        }
    }, [confirmEmailComplete, onComplete]);
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
            <TextField
                id="code"
                label="Code"
                {...register('code')}
                error={!!errors.code}
                helperText={errors.code?.message || ' '}
                variant="outlined"
                color="secondary"
                sx={{ width: '100%' }} />
            <Button 
            variant="contained"
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
            </Button>
            </Box>
        </Box>
    );
};
export default ConfirmEmailForm;