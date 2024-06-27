import { Box, Grid, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductBox from "../../components/ProductCarousel/ProductCarousel";
import home from '../../img/home.jpeg';
import { useEffect } from "react";
import CreateProductRequest from "../../api/models/request/Product/CreateProductRequest";
import Product from "../../api/Product";

interface Category {
    id: string
    image: string
    name: string
}

const HomePage = () => {
    const categories: Category[] = [
        {
            id: "1",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2qcKAz_hqMRda9TnCrnA1uZEmbAc6vLVQA&s",
            name: "Vegetables"
        },
        {
            id: "2",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3hizBuSvPUyEHHLmOX0qX7Ha3JKHjYsUbw&s",
            name: "Fruits"
        },
        {
            id: "3",
            image: "https://t4.ftcdn.net/jpg/03/64/41/07/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg",
            name: "Electronics"
        },
        {
            id: "4",
            image: "https://static01.nyt.com/images/2024/03/28/t-magazine/28tmag-furniture-slide-R35E-copy/28tmag-furniture-slide-R35E-copy-videoSixteenByNine3000.jpg",
            name: "Furniture"
        },
        {
            id: "5",
            image: "https://media.istockphoto.com/id/1141698953/photo/spa-products-for-home-skin-care.jpg?s=612x612&w=0&k=20&c=HxtIt73MwCZBY0APYngv0poZCEtyDhckTuT8SxJSxPE=",
            name: "Health and Beauty"
        },
        {
            id: "6",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQQX3y_yM_XPC5xNg29puCUrCkVJ9n4ihtg&s",
            name: "Beverages"
        },
        {
            id: "7",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSON8LjD5ps0G97ZAJ2un_xt8TlPIGxEabpNA&s",
            name: "Books and Media"
        },
        {
            id: "8",
            image: "https://assets.isu.pub/document-structure/230616123724-037fed6e5a94c4e43853143450546aa7/v1/b67a018a8919ba09c9dd845b7fdf15ea.jpeg",
            name: "Sports and Fitness"
        },
    ];
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
                    <ProductBox />
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
                                        backgroundImage: `url(${category.image})`,
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