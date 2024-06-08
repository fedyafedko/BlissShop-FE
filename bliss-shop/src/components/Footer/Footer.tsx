import { Box, Button, IconButton, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import { Google } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box component='footer'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'primary.dark',
                textAlign: 'center',
                alignItems: 'center',
                width: '100%',
                height: '300px',
                gap: '60px',
                boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: '10px',
                alignItems: 'center',
                width: '100%',
                gap: '200px',
            }}>
                <Button variant="text" color="secondary" sx={{
                    fontSize: '18px',
                }}>About us</Button>
                <Button variant="text" color="secondary" sx={{
                    fontSize: '18px',
                }}>FAQ</Button>
                <Button variant="text" color="secondary" sx={{
                    fontSize: '18px',
                }}>Privacy Policy</Button>
                <Button variant="text" color="secondary" sx={{
                    fontSize: '18px',
                }}>Help</Button>
                <Button variant="text" color="secondary" sx={{
                    fontSize: '18px',
                }}>Contact</Button>

            </Box>
            <Typography sx={{
                color: 'secondary.main',
                fontSize: '18px',

            }}>Discover a wide range of high-quality products at unbeatable prices.<br /> Enjoy a seamless shopping experience with our user-friendly website, secure payment options, and fast shipping.</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: '70px',
            }}>
                <IconButton aria-label="delete">
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <GitHubIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <Google />
                </IconButton>

            </Box>
        </Box>
    );
};

export default Footer