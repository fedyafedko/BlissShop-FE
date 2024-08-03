import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductResponse from '../../api/models/response/ProductResponse';
import productImage from '../../img/productImage.png';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const ProductCarousel = (props: {products: ProductResponse[]}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 5 >= props.products.length ? 0 : prevIndex + 5));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 5 < 0 ? props.products.length - (props.products.length % 5 === 0 ? 5 : props.products.length % 5) : prevIndex - 5));
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
                {props.products.slice(currentIndex, currentIndex + 5).map((product) => (
                    <Box key={product.id}>
                       <ProductCard product={product} />
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
