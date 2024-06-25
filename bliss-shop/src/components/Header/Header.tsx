import { Box, Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import AccountMenu from "../AccountMenu/AccountMenu";
import { useNavigate } from "react-router-dom";
import { access } from "fs";
import ProductCart from "../ProductCart/ProductCart";

const Header = () => {
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    return (
        <Box
            component='header'
            sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: '100px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    gap: '50px',
                    padding: '0 40px',
                    justifyContent: 'space-between',
                }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '150px',
                }}>
                    <Box
                        onClick={() => navigate('/')}
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            cursor: 'pointer',
                        }}>
                        <Typography variant="h4" sx={{
                            fontWeight: 'bold',
                            padding: '0 10px',
                            color: 'primary.main',
                            marginTop: '8px',
                            backgroundColor: 'secondary.main',
                        }}>
                            B L I S S
                        </Typography>
                        <Typography variant="h4" sx={{
                            color: 'secondary.main',
                            marginTop: '8px',
                        }}>
                            S H O P
                        </Typography>
                    </Box>
                    <SearchBar />
                </Box>
                {accessToken
                    ?
                    <Box sx={{
                        display: 'flex',
                        gap: '110px',
                    }}>
                        <ProductCart />
                        <AccountMenu />
                    </Box>
                    :
                    <Typography
                        onClick={() => navigate('/sign-in')}
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: 'primary.main',
                            backgroundColor: 'secondary.main',
                            padding: '5px 10px',
                        }}>Sign In</Typography>
                }
            </Box>
        </Box>
    );
};

export default Header;