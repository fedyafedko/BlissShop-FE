import ChangePasswordRequest from "./models/request/Auth/ChangePasswordRequest";
import UpdateProfileRequest from "./models/request/User/UpdateProfileRequest";
import ApiResponse from "./models/response/ApiResponse";
import UserResponse from "./models/response/UserResponse";
import Api from "./repository/Api";

const User = {
    me: async (): Promise<ApiResponse<UserResponse>> => {
        const response = await Api.get<UserResponse>('/user/me');

        if (response.success) {
            return response;
        }

        return response;
    },
    uploadAvatar: async (avatar: File): Promise<ApiResponse<boolean>> => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        const response = await Api.post<FormData, boolean>('/user/upload-avatar', formData);

        if (response.success) {
            return response;
        }

        return response;
    },
    deleteAvatar: async (): Promise<ApiResponse<boolean>> => {
        const response = await Api.delete<boolean>('/user/delete-avatar');

        if (response.success) {
            return response;
        }

        return response;
    },
    changePassword: async (request: ChangePasswordRequest ): Promise<ApiResponse<boolean>> => {
        const response = await Api.put<ChangePasswordRequest, boolean>('/user/change-password', request);

        if (response.success) {
            return response;
        }

        return response;
    },
    editProfile: async (request: UpdateProfileRequest): Promise<ApiResponse<boolean>> => {
        const response = await Api.put<UpdateProfileRequest, boolean>('/user/edit-profile', request);

        if (response.success) {
            return response;
        }

        return response;
    }
};

export default User;