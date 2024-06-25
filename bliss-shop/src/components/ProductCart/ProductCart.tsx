import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon, Button, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer } from "@mui/material";
import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";

const ProductCart = () => {
    const [state, setState] = React.useState({
        right: false,
    });
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ right: open });
    };

    const list = () => (
        <Box
            sx={{ width: 350, height: '100%', }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                padding: '15px',
                gap: '30px'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '310px',
                            height: '100px',
                            backgroundColor: 'secondary.light',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}>
                        <Box component='img' sx={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }} src="https://st3.depositphotos.com/1177973/12669/i/450/depositphotos_126693854-stock-photo-set-of-body-care-products.jpg" />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '10px',
                        }}>
                            <Typography variant="h6">Product Name</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: '10px',
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'secondary.main',
                                        borderRadius: '30px',
                                        gap: '10px',
                                    }}>
                                        <IconButton
                                            size="small" color="primary">
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography variant="body1" color="primary">1</Typography>
                                        <IconButton size="small" color="primary">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography sx={{ fontSize:'23px', fontWeight: 'bold'}}>$100</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            width: '100%',
                            height: '50px',
                            color: 'primary.dark',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '18px',
                        }}>Checkout 83.6$</Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            <IconButton color="secondary" aria-label="delete" size="large" onClick={toggleDrawer(true)} sx={{ border: '1px solid' }}>
                <ShoppingCartIcon fontSize="inherit" sx={{ width: '35px', height: '35px' }} />
            </IconButton>
            <SwipeableDrawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </>
    );
};

export default ProductCart;
