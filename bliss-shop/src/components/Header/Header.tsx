import { Box, Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import AccountMenu from "../AccountMenu/AccountMenu";

const Header = () => {
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
                    <Box sx={{
                        display: 'flex',
                        gap: '10px',
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
                <AccountMenu />
            </Box>
        </Box>
    );
};

export default Header;