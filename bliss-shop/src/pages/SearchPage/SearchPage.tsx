import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import { useEffect, useState } from "react";
import SearchProductRequest from "../../api/models/request/Product/SearchProductRequest";
import ProductResponse from "../../api/models/response/ProductResponse";
import Product from "../../api/Product";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import productNotFound from '../../img/productNotFound.png';
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import PageListResponse from "../../api/models/response/PageListResponse";

const SearchPage = () => {
    const params = useParams();
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [searchProduct, setSearchProduct] = useState<PageListResponse<ProductResponse> | null>(null);
    const navigate = useNavigate();

    const SearchProductRequest = async (page: number, sort: string) => {
        const request: SearchProductRequest = {
            search: params.searchTerm ?? '',
            page: page,
            pageSize: 20,
        };
        const response = await Product.getAll(request, sort);
        if (response.data?.items !== undefined) {
            setSearchProduct(response.data);
        }
    };

    useEffect(() => {
        const getProduct = async () => {
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

        SearchProductRequest(1, '');
        getProduct();
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
        }}>
            <Header />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
            }}>
                <Box sx={{
                    width: '1270px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        marginLeft: '55px',
                        fontSize: '26px',
                        alignSelf: 'start',
                    }}>Search Results</Typography>
                    <Box sx={{
                        alignSelf: 'flex-end',
                        paddingRight: '55px',
                    }}>
                    <PaginationComponent getProductCategory={SearchProductRequest} product={searchProduct} />
                    </Box>
                    {searchProduct?.items.length === 0 ?
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <Box component='img' src={productNotFound} sx={{
                                width: '300px',
                                height: 'auto',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <Typography sx={{
                                    fontWeight: 'bold',
                                    fontSize: '28px',
                                }}>No products found</Typography>
                                <Typography sx={{
                                    textAlign: 'center',
                                    width: '270px',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                }}>Your search did not match any products. Please try again.</Typography>
                            </Box>
                            <Button
                                onClick={() => navigate('/')}
                                variant='contained'
                                sx={{
                                    backgroundColor: 'secondary.main',
                                    color: 'primary.main',
                                    width: '300px',
                                    height: '40px',
                                    marginTop: '20px',
                                    textTransform: 'none',
                                    ":hover": {
                                        backgroundColor: 'secondary.dark',
                                    },
                                }}>Go back to homepage</Button>
                        </Box>
                        :
                        <Box sx={{
                            width: '90%',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '35px',
                        }}>
                            {searchProduct?.items.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Box>
                    }
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        fontSize: '26px',
                    }}>Featured Products</Typography>
                    <ProductCarousel products={products} />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default SearchPage;