import ApiResponse from "./models/response/ApiResponse";
import RatingResponse from "./models/response/RatingResponse";
import Api from "./repository/Api";

const RatingProduct = {
    getForProduct: async (id: string): Promise<ApiResponse<RatingResponse[]>> => {
        const response = await Api.get<RatingResponse[]>(`/rating/${id}`);

        if (response.success) {
            return response;
        }

        return response.error;
    },
}

export default RatingProduct;