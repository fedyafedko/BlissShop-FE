import AddToProductCartRequest from "./models/request/Product/AddToProductCartRequest";
import ApiResponse from "./models/response/ApiResponse";
import ProductCartResponse from "./models/response/ProductCartResponses/ProductCartResponse";
import Api from "./repository/Api";

const ProductCart = {
    getForUser: async (): Promise<ApiResponse<ProductCartResponse>> => {
        const response = await Api.get<ProductCartResponse>(`/product-cart/get-product-cart`);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    addToCart: async (productId: string, quantity: number): Promise<ApiResponse<any>> => {
        const response = await Api.post(`/product-cart`, {productId: productId, quantity: quantity} as AddToProductCartRequest);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    removeFromCart: async (productId: string): Promise<ApiResponse<any>> => {
        const response = await Api.delete(`/product-cart?productId=${productId}`);

        if (response.success) {
            return response;
        }

        return response.error;
    }
};

export default ProductCart;