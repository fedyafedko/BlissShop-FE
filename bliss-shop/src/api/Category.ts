import ApiResponse from "./models/response/ApiResponse";
import CategoryResponse from "./models/response/CategoryResponse";
import Api from "./repository/Api";

const Category = {
    getAll: async (): Promise<ApiResponse<CategoryResponse[]>> => {
        const response = await Api.get<CategoryResponse[]>(`/category`);

        if (response.success) {
            return response;
        }

        return response.error;
    },
}

export default Category;