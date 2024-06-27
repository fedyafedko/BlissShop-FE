import ApiResponse from "./ApiResponse";

interface AuthSuccessResponse {
    accessToken: string;
    refreshToken: string;
}

export default AuthSuccessResponse;