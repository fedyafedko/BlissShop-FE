import CreateAddressRequest from "./models/request/CreateAddressRequest";
import AddressResponse from "./models/response/AddressResponse";
import ApiResponse from "./models/response/ApiResponse";
import Api from "./repository/Api";

const Address = {
    getAllForUser: async (): Promise<ApiResponse<AddressResponse[]>> => {
        const response = await Api.get<AddressResponse[]>(`/address/get-addresses-for-user`);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    add: async (request: CreateAddressRequest): Promise<ApiResponse<AddressResponse>> => {
        const response = await Api.post<CreateAddressRequest, AddressResponse>(`/address`, request);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    delete: async (addressId: string): Promise<ApiResponse<boolean>> => {
        const response = await Api.delete<boolean>(`/address?addressId=${addressId}`);

        if (response.success) {
            return response;
        }

        return response.error;
    }
}

export default Address;