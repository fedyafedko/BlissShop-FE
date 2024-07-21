import ProductCartItemResponse from "./ProductCartItemResponse";

interface ProductCartResponse {
    products: ProductCartItemResponse[];
    totalPrice: number;
}

export default ProductCartResponse;