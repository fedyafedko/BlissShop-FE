import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import productImage from '../../img/productImage.png';
import React, { useEffect, useState } from "react";
import ProductCartResponse from "../../api/models/response/ProductCartResponses/ProductCartResponse";
import ProductCart from "../../api/ProductCart";
import AddressResponse from "../../api/models/response/AddressResponse";
import Address from "../../api/Address";
import CheckoutRequest from "../../api/models/request/CheckoutRequest";
import Order from "../../api/Order";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const CheckoutPage = () => {
    const [productsCart, setProductsCart] = useState<ProductCartResponse>();
    const [addresses, setAddresses] = useState<AddressResponse[]>();
    const [value, setValue] = useState('');
    const { notifyError, notifySuccess, Notification } = useNotification();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await ProductCart.getForUser();
            if (response.success) {
                setProductsCart(response.data);
            }
        };
        const getAddresses = async () => {
            const response = await Address.getAllForUser();
            if (response.data) {
                setAddresses(response.data);
            }
        };
        fetchData();
        getAddresses();
    }, []);

    const handleCheckout = async () => {
        const request: CheckoutRequest = {
            cartId: productsCart?.id ?? '',
            addressId: value,
        };
        const response = await Order.checkout(request);
        if (response.success) {
            window.location.href = `${response.data}`
        }
        else {
            notifyError("Failed to checkout");
        }
    };

    return (
        <Box>
            <Header />
            <Box sx={{
                width: '100%',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                justifySelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '25px',
                gap: '20px',
            }}>
                <Box sx={{
                    width: '100%',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifySelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '25px',
                    gap: '20px',
                }}>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '550px',
                        height: '500px',
                        border: '1px solid #AFB8C0',
                        borderRadius: '24px',
                        padding: '15px 20px',
                        overflowY: 'auto',
                        ':-webkit-scrollbar': 'none',
                        '-ms-scrollbar-width': 'none',
                        scrollbarWidth: 'none',
                    }}>
                        {addresses?.length === 0 ? (
                            <Typography sx={{ color: 'secondary.main', fontWeight: 'bold' }}>No addresses found</Typography>
                        ) : (
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChange}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                    }}
                                >
                                    {addresses?.map((address) => (
                                        <FormControlLabel
                                            sx={{
                                                width: '530px',
                                                height: '50px',
                                                borderRadius: '24px',
                                                border: '1px solid #AFB8C0',
                                                backgroundColor: value === `${address.id}` ? 'secondary.main' : 'transparent',
                                                color: value === `${address.id}` ? 'primary.main' : 'secondary.main',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            value={address.id}
                                            control={<Radio sx={{ display: 'none' }} />}
                                            label={address.country + ', ' + address.city + ', ' + address.street + ', ' + address.zipCode}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    </Box>
                    <Box sx={{
                        width: '550px',
                        height: '500px',
                        borderRadius: '24px',
                        border: '1px solid #AFB8C0',
                        overflowY: 'auto',
                        ':-webkit-scrollbar': 'none',
                        '-ms-scrollbar-width': 'none',
                        scrollbarWidth: 'none',
                    }}>
                        {productsCart?.products.map((product) => (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    padding: '15px',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}>
                                    <Box
                                        component='img'
                                        src={product.product.imagesPath.length > 0 ? `${IMAGES_URL + product.product.imagesPath[0]}` : productImage}
                                        sx={{
                                            width: '90px',
                                            height: '90px',
                                            backgroundColor: 'red',
                                        }} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '5px',
                                            width: '70%',
                                        }}>

                                        <Typography sx={{
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>{product.product.name}</Typography>
                                        <Typography sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>{product.product.description}</Typography>
                                        <Typography>Price: {product.product.price}</Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ width: '100%', }} />
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        textTransform: 'none',
                        width: '200px',
                    }}
                    onClick={() => {
                        if (value) {
                            handleCheckout();
                        } else {
                            notifyError("Please, select address");
                        }
                    }}
                >
                    Checkout {productsCart?.totalPrice}$
                </Button>
            </Box>
            <Footer />
        </Box>
    );
};

export default CheckoutPage;