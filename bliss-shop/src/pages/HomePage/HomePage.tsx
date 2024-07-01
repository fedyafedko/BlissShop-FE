import { Box, Grid, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import home from '../../img/home.jpeg';
import { useEffect, useState } from "react";
import Product from "../../api/Product";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import ProductResponse from "../../api/models/response/ProductResponse";
import SearchProductRequest from "../../api/models/request/Product/SearchProductRequest";
import CategoryResponse from "../../api/models/response/CategoryResponse";
import Category from "../../api/Category";

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const HomePage = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

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

    useEffect(() => {
        const fetchData = async () => {
           const response = await Category.getAll();
        if (response.success && response.data !== undefined)
            setCategories(response.data);
        };
        fetchData();
     }, []);
     
    return (
        <Box>
            <Header />
            <img src={home} style={{ width: '100%', height: '500px', objectFit: 'cover', objectPosition: 'center' }} />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                gap: '40px',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                    gap: '20px',
                }}>
                    <Typography sx={{
                        marginLeft: '50px',
                        fontWeight: 'bold',
                        fontSize: '30px',
                    }}>Featured Products</Typography>
                    <ProductCarousel products={products}/>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '80%',
                        flexDirection: 'column',
                        gap: '20px',
                    }}>
                    <Typography sx={{
                        marginLeft: '50px',
                        fontWeight: 'bold',
                        fontSize: '30px',
                    }}>Categories</Typography>
                    <Grid
                        container
                        spacing={2}
                        rowSpacing={4}
                        columns={{ xs: 4, sm: 8, md: 4 }}
                        sx={{
                            display: 'flex',
                            marginBottom: '20px',
                        }}>
                        {categories.map((category) => (
                            <Grid item xs={2} sm={4} md={1}>
                                <Box
                                    onClick={() => console.log(category.id)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}>
                                    <Box sx={{
                                        width: '155px',
                                        height: '155px',
                                        backgroundImage: `url(${IMAGES_URL + category.imageUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '100%'
                                    }} />
                                    <Typography variant="h6">{category.name}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default HomePage;