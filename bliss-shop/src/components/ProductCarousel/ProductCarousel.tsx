import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Product from '../../api/Product';
import ProductResponse from '../../api/models/response/ProductResponse';
import productImage from '../../img/productImage.png';
import SearchProductRequest from '../../api/models/request/Product/SearchProductRequest';

const ProductCarousel = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 5 >= products.length ? 0 : prevIndex + 5));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 5 < 0 ? products.length - (products.length % 5 === 0 ? 5 : products.length % 5) : prevIndex - 5));
    };

    useEffect(() => {
       const fetchData = async () => {
        const request: SearchProductRequest = {
            search: '',
            page: 1,
            pageSize: 30,
        };
          const response = await Product.getAll(request);
          if (response.data?.items !== undefined){
              setProducts(response.data?.items);
          }
       };
       fetchData();
    }, []);

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
                                width: '200px',
                                height: '300px',
                                backgroundColor: 'primary.main',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '4px 5px 8px rgba(0, 0, 0, 0.2)',
                            }}>
                            <Box 
                              component='img'
                              src={product.imagesPath[0] ? `https://localhost:7299${product.imagesPath[0]}` : productImage}
                              sx={{
                                width: '100%',
                                height: '65%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                              }}
                            />
                            <Box sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                height: '35%', 
                                width: '100%',
                                color: 'white',
                                padding: '10px'
                            }}>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>{product.name}</Typography>
                                {product.quantity === 0 ?
                                <Typography variant='body2' sx={{
                                    padding: '6px 0'
                                }}>Немає  в наявності</Typography>
                                : null
                                }
                                <Typography variant='h5' sx={{
                                    fontWeight: 'bold'
                                }}>{product.price}$</Typography>
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
