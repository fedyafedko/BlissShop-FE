import { Box, Button, Typography } from "@mui/material";

interface FinishAuthProps {
    onComplete: () => void;
};

const FinishAuth: React.FC<FinishAuthProps> = ({ onComplete }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            padding: '20px',
            width: '500px',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                gap: '30px',
                width: '500px',
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome to BlissShop!</Typography>
                <Typography variant="body1">Thank you for registering with us. We're thrilled to have you as a member of our community. Your account has been successfully created, and you're now ready to explore a world of fantastic products and exclusive deals.</Typography>
            </Box>
            <Button
                variant="contained"
                onClick={onComplete}
                color="secondary"
                sx={{
                    width: '50%',
                    height: '50px',
                    color: 'primary.dark',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '18px',
                }}>
                Go to Home
            </Button>
        </Box>
    );
};

export default FinishAuth;