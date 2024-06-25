import { Box, Typography } from "@mui/material";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import StepperBar from "../../components/StepperBar/StepperBar";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordPage = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Box sx={{
                display: 'flex',
                backgroundColor: 'primary.main',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}>
                <ResetPasswordForm />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to right,#6BC791, #276841)',
                width: '100%',
                height: '100vh',
                gap: '20px',
            }}>
                <LocalGroceryStoreIcon
                sx={{ 
                    width: 60,
                    height: 60,
                    color: '#F3F9E3',
                    }}/>
                <Box sx={{
                        display: 'flex',
                    }}>
                        <Typography variant="h3" sx={{
                            fontWeight: 'bold',
                            padding: '0 10px',
                            color: 'primary.main',
                            backgroundColor: 'secondary.main',
                        }}>
                            B L I S S
                        </Typography>
                        <Typography variant="h3" sx={{
                            color: 'secondary.main',
                            padding: '0 10px',
                            backgroundColor: 'primary.main',
                            fontWeight: 'bold',
                        }}>
                            S H O P
                        </Typography>
                    </Box>
            </Box>
        </Box>
    );
};

export default ResetPasswordPage;