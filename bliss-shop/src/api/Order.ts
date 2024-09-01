import ApiResponse from "./models/response/ApiResponse";
import OrderResponse from "./models/response/OrderResponse";
import Api from "./repository/Api";
import CheckoutRequest from "./models/request/CheckoutRequest";

const Order = {
    getById: async (orderId: string): Promise<ApiResponse<OrderResponse>> => {
        const response = await Api.get<OrderResponse>(`/order/get-order?orderId=${orderId}`);

        if (response.success) {
            return response;
        }

        return response;
    },
    getForUser: async (): Promise<ApiResponse<OrderResponse[]>> => {
        const response = await Api.get<OrderResponse[]>('/order/get-orders-for-user');

        if (response.success) {
            return response;
        }

        return response;
    },
    getForSeller: async (): Promise<ApiResponse<OrderResponse[]>> => {
        const response = await Api.get<OrderResponse[]>('/order/get-orders-for-seller');

        if (response.success) {
            return response;
        }

        return response;
    },
    checkout: async (request: CheckoutRequest): Promise<ApiResponse<string>> => {
        const response = await Api.post<CheckoutRequest, string>('/order/check-out', request);

        if (response.success) {
            return response;
        }

        return response;
    },
    refund: async (orderId: string): Promise<ApiResponse<string>> => {
        const response = await Api.post<string, string>(`/order/refund?orderId=${orderId}`, '');

        if (response.success) {
            return response;
        }

        return response;
    },
    approvedOrder: async (orderId: string): Promise<ApiResponse<string>> => {
        const response = await Api.put<string, string>(`/order/approved-order?orderId=${orderId}`, '');

        if (response.success) {
            return response;
        }

        return response;
    }
};

export default Order;