import { Box, Button, Divider, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import { useEffect, useState } from "react";
import ProductResponse from "../../api/models/response/ProductResponse";
import SearchProductRequest from "../../api/models/request/Product/SearchProductRequest";
import Product from "../../api/Product";
import Category from "../../api/Category";
import CategoryResponse from "../../api/models/response/CategoryResponse";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageListResponse from "../../api/models/response/PageListResponse";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import productNotFound from '../../img/productNotFound.png';

const CategoryPage = () => {
    const params = useParams();
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [productCategories, setProductCategories] = useState<PageListResponse<ProductResponse> | null>(null);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    const getProductCategory = async (page: number, sort: string) => {
        const request: SearchProductRequest = {
            search: '',
            page: page,
            pageSize: 10,
        };
        const response = await Product.getByCategory(params.categoryId ?? '', request, sort);
        if (response.success && response.data !== undefined) {
            setProductCategories(response.data);
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

        const getCategory = async () => {
            const response = await Category.getAll();
            if (response.success && response.data !== undefined) {
                setCategories(response.data);
            }
        };

        getCategory();
        getProductCategory(1, '');
        getProduct();
    }, []);

    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        width: '200px',
                        gap: '10px',
                    }}>
                        {categories.map((category) => (
                            <Link href={`/category/${category.name}/${category.id}`} sx={{
                                color: 'secondary.main',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                ":hover": {
                                    textDecoration: 'underline',
                                },
                            }}>{category.name}</Link>
                        ))}
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '50px',
                }}>
                    {productCategories?.items.length === 0 ?
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            paddingTop: '30px',
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
                                }}>Sorry, but no product was found for this category.</Typography>
                            </Box>
                        </Box>
                        :
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '40px',
                            gap: '20px',
                        }}>
                            <PaginationComponent getProductCategory={getProductCategory} product={productCategories} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: '35px',
                            }}>
                                {productCategories?.items.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </Box>
                        </Box>
                    }
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingBottom: '30px',
                        paddingLeft: '20px',
                        gap: '20px',
                    }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '30px',
                        }}>Featured Products</Typography>
                        <ProductCarousel products={products} />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default CategoryPage;