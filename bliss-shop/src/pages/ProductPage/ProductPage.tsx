import { Avatar, Box, Button, Divider, Rating, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import Feedback from "../../components/Feedback/Feedback";
import StarIcon from '@mui/icons-material/Star';
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import { useEffect, useState } from "react";
import ProductResponse from "../../api/models/response/ProductResponse";
import SearchProductRequest from "../../api/models/request/Product/SearchProductRequest";
import Product from "../../api/Product";
import { useParams } from "react-router-dom";
import RatingProduct from "../../api/RatingProduct";
import RatingResponse from "../../api/models/response/RatingResponse";
import ProductCart from "../../api/ProductCart";
import useNotification from "../../hooks/useNotification";

const ProductPage = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [rating, setRating] = useState<RatingResponse[]>([]);
    const productId = useParams();
    const [showAll, setShowAll] = useState(false);
    const { notifyError, notifySuccess, Notification } = useNotification();
    const itemsToShow = showAll ? rating : rating.slice(0, 2);

    const handleShowMore = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        const getAllProducts = async () => {
            const request: SearchProductRequest = {
                search: '',
                page: 1,
                pageSize: 30,
            };
            const response = await Product.getAll(request, '');
            if (response.data?.items !== undefined) {
                setProducts(response.data?.items);
            }
        };

        const getProduct = async () => {
            const response = await Product.getById(productId.id as string);
            if (response.data !== undefined) {
                setProduct(response.data);
            }
        };

        const getRating = async () => {
            const response = await RatingProduct.getForProduct(productId.id as string);
            if (response.data !== undefined) {
                setRating(response.data);
            }
        };

        getProduct();
        getRating();
        getAllProducts();
    }, []);

    const handleAddToCart = async () => {
        const response = await ProductCart.addToCart(productId.id as string, 1);
        window.location.reload();
        if (response.success) {
            notifySuccess('Product added to cart');
        } else {
            notifyError(response.error?.message ?? 'Error adding product to cart');
        }
    };

    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '4% 10%',
                justifyContent: 'center',
                gap: '70px',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '50px',
                    }}
                >
                    <ProductImageGallery images={product?.imagesPath ?? []} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: '15px',
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{product?.name}</Typography>
                        <Typography variant="h6">{product?.price}$</Typography>
                        <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
                        <Typography variant="body1">{product?.description}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddToCart}
                            sx={{
                                textTransform: 'none',
                                width: '300px'
                                }}>Add to Cart</Button>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Customer Reviews ({rating.length})</Typography>
                    <Divider />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingLeft: '10px',
                        width: '500px',
                        height: '150px',
                        margin: '10px 20px',
                        backgroundColor: 'lightgray',
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{product?.totalRating ?? 0.0}</Typography>
                            <Rating
                                name="text-feedback"
                                value={product?.totalRating ?? 0.0}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55, }} fontSize="inherit" />}
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        justifyContent: 'center',
                    }}>
                        {itemsToShow.map((item) => (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                margin: '0 20px',
                                gap: '10px',
                                border: '1px solid lightgray',
                                borderRadius: '10px',
                                padding: '10px',
                                width: '97%',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                }}>
                                    <Avatar />
                                    <Typography variant="h5">{item.user.fullName}</Typography>
                                </Box>
                                <Feedback value={item.rate} />
                                <Typography variant="body1">{item.comment}</Typography>
                            </Box>
                        ))}
                        {rating.length > 2 && (
                            <Button
                                variant="contained"
                                onClick={handleShowMore}
                                sx={{
                                    width: '150px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    textTransform: 'none',
                                    borderRadius: '20px',
                                    ":hover": {
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    },
                                }}>
                                {showAll ? 'Show Less' : 'Show More'}
                            </Button>
                        )}
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Recommended from shop</Typography>
                        <Divider />
                    </Box>
                    <ProductCarousel products={products} />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default ProductPage;