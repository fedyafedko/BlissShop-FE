import { get } from "http";
import CreateProductRequest from "./models/request/Product/CreateProductRequest";
import SearchProductRequest from "./models/request/Product/SearchProductRequest";
import ApiResponse from "./models/response/ApiResponse";
import PageListResponse from "./models/response/PageListResponse";
import ProductResponse from "./models/response/ProductResponse";
import Api from "./repository/Api";

const Product = {
    getAll: async (request: SearchProductRequest, sorting: string): Promise<ApiResponse<PageListResponse<ProductResponse>>> => {
        const response = await Api.get<PageListResponse<ProductResponse>>(`/product/search-product?Search=${request.search}&Page=${request.page}&PageSize=${request.pageSize}&sorting=${sorting}`);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    add: async (request: CreateProductRequest): Promise<ApiResponse<ProductResponse>> => {
        const response = await Api.post<CreateProductRequest, ProductResponse>('/product/add-product', request);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    getById: async (id: string): Promise<ApiResponse<ProductResponse>> => {
        const response = await Api.get<ProductResponse>(`/product/get-product-by-id?id=${id}`);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    
    getByCategory: async (categoryId: string, request: SearchProductRequest, sorting: string): Promise<ApiResponse<PageListResponse<ProductResponse>>> => {
        const response = await Api.get<PageListResponse<ProductResponse>>(`/product/get-products-for-category?categoryId=${categoryId}&Page=${request.page}&PageSize=${request.pageSize}&sorting=${sorting}`);

        if (response.success) {
            return response;
        }

        return response.error;
    },

}

export default Product;