import { Box, Typography } from "@mui/material";
import ProductResponse from "../../api/models/response/ProductResponse";
import { useNavigate } from "react-router-dom";
import productImage from '../../img/productImage.png';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const ProductCard = (props: { product: ProductResponse }) => {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => navigate(`/product/${props.product.id}`)}
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
                src={props.product.imagesPath[0] ? `${IMAGES_URL + props.product.imagesPath[0]}` : productImage}
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
                }}>{props.product.name}</Typography>
                {props.product.quantity === 0 ?
                    <Typography variant='body2' sx={{
                        padding: '6px 0'
                    }}>Немає  в наявності</Typography>
                    :
                    <Typography variant='h5' sx={{
                        fontWeight: 'bold'
                    }}>{props.product.price}$</Typography>
                }
            </Box>
        </Box>
    );
};

export default ProductCard;