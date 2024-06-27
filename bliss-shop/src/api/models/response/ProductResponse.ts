interface ProductResponse {
    id: string;
    shopId: string;
    categoryId: string;
    name: string;
    price: number;
    description: string;
    tags: string[];
    quantity: number;
    imagesPath: string[];
};

export default ProductResponse;