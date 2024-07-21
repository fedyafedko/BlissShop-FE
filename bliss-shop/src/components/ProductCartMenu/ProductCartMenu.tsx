import { Box, Typography, IconButton, Divider, Button, SwipeableDrawer } from "@mui/material";
import React, { useEffect } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductCart from "../../api/ProductCart";
import ProductCartResponse from "../../api/models/response/ProductCartResponses/ProductCartResponse";
import productImage from '../../img/productImage.png';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const ProductCartMenu = () => {
    const [productsCart, setProductsCart] = React.useState<ProductCartResponse>();
    const [state, setState] = React.useState({
        right: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await ProductCart.getForUser();
            if (response.success) {
                setProductsCart(response.data);
            }
        };
        fetchData();
    }, []);

    const handleAddToCart = async (productId: string) => {
        const response = await ProductCart.addToCart(productId, 1);
        if (response.success) {
            const response = await ProductCart.getForUser();
            if (response.success) {
                setProductsCart(response.data);
            }
        }
    };

    const handleRemoveFromCart = async (productId: string) => {
        const response = await ProductCart.removeFromCart(productId);
        if (response.success) {
            const response = await ProductCart.getForUser();
            if (response.success) {
                setProductsCart(response.data);
            }
        }
    };

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
                gap: '30px'
            }}>
                {productsCart?.products.length === 0 ?
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px'}}>Cart is empty</Typography>
                    : 
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {productsCart?.products.map((productCart) => (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    padding: '10px',
                                    height: '100px',
                                }}>
                                <Box sx={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundImage: `url(${productCart.product.imagesPath.length > 0 ? `${IMAGES_URL + productCart.product.imagesPath[0]}` : productImage})`,
                                    objectFit: 'cover',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }} />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    padding: '0 10px',
                                    justifyContent: 'space-between',
                                    maxWidth: '75%',
                                }}>
                                    <Typography variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',

                                        }}>{productCart.product.name}</Typography>
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
                                                <IconButton size="small" color="primary" onClick={() => handleRemoveFromCart(productCart.product.id)}>
                                                    <RemoveIcon sx={{ fontSize: 15 }} />
                                                </IconButton>
                                                <Typography variant="body2" color="primary">{productCart.quantity}</Typography>
                                                <IconButton size="small" color="primary" onClick={() => handleAddToCart(productCart.product.id)}>
                                                    <AddIcon sx={{ fontSize: 15 }} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{productCart.product.price}$</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider sx={{ width: '100%' }} />
                        </>
                    ))}
                </Box>
}
                {productsCart?.products.length === 0 ?
                    null
                    :
                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                width: '90%',
                                height: '50px',
                                color: 'primary.dark',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                margin: '15px',
                                fontSize: '18px',
                            }}>Checkout {productsCart?.totalPrice}$</Button>
                    </Box>
                }
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

export default ProductCartMenu;
