import ProductCartItemResponse from "./ProductCartItemResponse";

interface ProductCartResponse {
    id: string;
    products: ProductCartItemResponse[];
    totalPrice: number;
}

export default ProductCartResponse;