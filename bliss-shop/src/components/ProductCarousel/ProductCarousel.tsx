import React, { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductCarousel = () => {
    const products = [
        {
            id: '1',
            image: 'https://assets.isu.pub/document-structure/230616123724-037fed6e5a94c4e43853143450546aa7/v1/b67a018a8919ba09c9dd845b7fdf15ea.jpeg',
            name: 'Product 1',
            price: '$10',
        },
        {
            id: '2',
            image: 'product2.jpg',
            name: 'Product 2',
            price: '$20',
        },
        {
            id: '3',
            image: 'product3.jpg',
            name: 'Product 3',
            price: '$30',
        },
        {
            id: '4',
            image: 'product4.jpg',
            name: 'Product 4',
            price: '$40',
        },
        {
            id: '5',
            image: 'product5.jpg',
            name: 'Product 5',
            price: '$50',
        },
        {
            id: '10',
            image: 'https://assets.isu.pub/document-structure/230616123724-037fed6e5a94c4e43853143450546aa7/v1/b67a018a8919ba09c9dd845b7fdf15ea.jpeg',
            name: 'Product 10',
            price: '$10',
        },
        {
            id: '2',
            image: 'product2.jpg',
            name: 'Product 2',
            price: '$20',
        },
        {
            id: '3',
            image: 'product3.jpg',
            name: 'Product 3',
            price: '$30',
        },
        {
            id: '4',
            image: 'product4.jpg',
            name: 'Product 4',
            price: '$40',
        },
        {
            id: '5',
            image: 'product5.jpg',
            name: 'Product 5',
            price: '$50',
        },
        {
            id: '15',
            image: 'https://assets.isu.pub/document-structure/230616123724-037fed6e5a94c4e43853143450546aa7/v1/b67a018a8919ba09c9dd845b7fdf15ea.jpeg',
            name: 'Product 15',
            price: '$10',
        },
        {
            id: '2',
            image: 'product2.jpg',
            name: 'Product 2',
            price: '$20',
        },
        {
            id: '3',
            image: 'product3.jpg',
            name: 'Product 3',
            price: '$30',
        },
        {
            id: '4',
            image: 'product4.jpg',
            name: 'Product 4',
            price: '$40',
        },
        {
            id: '5',
            image: 'product5.jpg',
            name: 'Product 5',
            price: '$50',
        },
        {
            id: '20',
            image: 'https://assets.isu.pub/document-structure/230616123724-037fed6e5a94c4e43853143450546aa7/v1/b67a018a8919ba09c9dd845b7fdf15ea.jpeg',
            name: 'Product 20',
            price: '$10',
        },
        {
            id: '2',
            image: 'product2.jpg',
            name: 'Product 2',
            price: '$20',
        },
        {
            id: '3',
            image: 'product3.jpg',
            name: 'Product 3',
            price: '$30',
        },
        {
            id: '4',
            image: 'product4.jpg',
            name: 'Product 4',
            price: '$40',
        },
        {
            id: '5',
            image: 'product5.jpg',
            name: 'Product 5',
            price: '$50',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 5 >= products.length ? 0 : prevIndex + 5));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 5 < 0 ? products.length - (products.length % 5 === 0 ? 5 : products.length % 5) : prevIndex - 5));
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '300px',
            overflow: 'hidden',
            position: 'relative',
            padding: '0px'
        }}>
            <IconButton color="secondary" aria-label="previous" onClick={handlePrev}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                }}>
                {products.slice(currentIndex, currentIndex + 5).map((product) => (
                    <Box key={product.id}>
                        <Box
                            onClick={()=> console.log(product.id)}
                            sx={{
                                width: '210px',
                                height: '300px',
                                backgroundColor: 'primary.main',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '4px 5px 8px rgba(0, 0, 0, 0.2)',
                            }}>
                            <Box sx={{
                                width: '100%',
                                height: '65%',
                                backgroundImage: `url(${product.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>

                            </Box>
                            <Box sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                height: '35%', 
                                width: '100%',
                                color: 'white',
                                padding: '10px'
                            }}>
                                <Typography sx={{
                                    fontWeight: 'bold'
                                }}>{product.name}</Typography>
                                <Typography variant='body2' sx={{
                                    padding: '6px 0'
                                }}>Немає  в наявності</Typography>
                                <Typography variant='h5' sx={{
                                    fontWeight: 'bold'
                                }}>{product.price}</Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            <IconButton color="secondary" aria-label="next" onClick={handleNext}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default ProductCarousel;
