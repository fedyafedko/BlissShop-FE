import { Box, IconButton } from "@mui/material";
import { SetStateAction, useState, useRef, useEffect } from "react";
import productImage from '../../img/productImage.png';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const ProductImageGallery = (props: { images: string[] }) => {
    const [mainImage, setMainImage] = useState('');
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.images.length > 0) {
            setMainImage(`${IMAGES_URL}${props.images[0]}`);
        }
        else {
            setMainImage(productImage);
        }
    }, [props.images[0]]);

    const handleThumbnailClick = (src: SetStateAction<string>) => {
        setMainImage(src);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '400px',
                    gap: '1px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    ref={carouselRef}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        height: '100%',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                    }}
                >
                    {props.images.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '50px',
                                height: '50px',
                                cursor: 'pointer',
                                borderRadius: '10px',
                                backgroundImage: `url(${IMAGES_URL + image})`,
                                objectFit: 'cover',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            onMouseEnter={() => setMainImage(`${IMAGES_URL + image}`)}
                            onClick={() => handleThumbnailClick(`${IMAGES_URL + image}`)}
                        />
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    width: '400px',
                    height: '400px',
                    borderRadius: '20px',
                    backgroundImage: `url(${mainImage})`,
                    objectFit: 'cover',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
        </Box>
    );
};

export default ProductImageGallery;