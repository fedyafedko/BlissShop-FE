import CreateAddressRequest from "./models/request/CreateAddressRequest";
import UpdateSettingRequest from "./models/request/UpdateSettingRequest";
import AddressResponse from "./models/response/AddressResponse";
import ApiResponse from "./models/response/ApiResponse";
import SettingResponse from "./models/response/SettingResponse";
import Api from "./repository/Api";

const Setting = {
    getForUser: async (): Promise<ApiResponse<SettingResponse>> => {
        const response = await Api.get<SettingResponse>(`/setting/get-settings`);

        if (response.success) {
            return response;
        }

        return response.error;
    },
    update: async (request: UpdateSettingRequest): Promise<ApiResponse<null>> => {
        const response = await Api.put<UpdateSettingRequest, null>(`/setting/update-settings`, request);

        if (response.success) {
            return response;
        }

        return response.error;
    },
}

export default Setting;