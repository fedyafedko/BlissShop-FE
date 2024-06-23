import ConfirmEmailRequest from "./models/request/Auth/ConfirmEmailRequest";
import ResetPasswordRequest from "./models/request/Auth/ResetPasswordRequest";
import SignInRequest from "./models/request/Auth/SignInRequest";
import SignUpGoogleRequest from "./models/request/Auth/SignUpGoogleRequest";
import SignUpRequest from "./models/request/Auth/SignUpRequest";
import ApiResponse from "./models/response/ApiResponse";
import AuthSuccessResponse from "./models/response/AuthSuccessResponse";
import SignUpResponse from "./models/response/SignUpResponse";
import Api from "./repository/Api";

const Auth = {
    signUp: async (request: SignUpRequest): Promise<ApiResponse<SignUpResponse>> => {
        const response = await Api.post<SignUpRequest, SignUpResponse>('/auth/sign-up', request);

        if (response.success) {
            return response;
        }

        return response;
    },
    signIn: async (request: SignInRequest): Promise<any> => {
        const response = await Api.post<SignInRequest, AuthSuccessResponse>('/auth/sign-in', request);

        if (response.success) {
            const tokens = response.data as AuthSuccessResponse;
            localStorage.setItem('accessToken', tokens.accessToken ?? '');
            localStorage.setItem('refreshToken', tokens.refreshToken ?? '');

            return response;
        }

        return response;
    },
    signUpGoogle: async (request: SignUpGoogleRequest): Promise<any> => {
        const response = await Api.post<{}, AuthSuccessResponse>(`/google-auth/google-sign-up?role=${request.role}`, { }, { 'Authorization-Code': request.code });

        if (response.success) {
            const tokens = response.data as AuthSuccessResponse;
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            return undefined;
        }

        return response.error;
    },
    signInGoogle: async (token: string): Promise<any> => {
        const response = await Api.post<{}, AuthSuccessResponse>('/google-auth/google-sign-in', { }, { 'Authorization-Code': token });

        if (response.success) {
            const tokens = response.data as AuthSuccessResponse;
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            return undefined;
        }

        return response.error;
    },
    confirmEmail: async (data: ConfirmEmailRequest): Promise<any> => {
        const response = await Api.post<ConfirmEmailRequest, AuthSuccessResponse>('/auth/confirm-email', data);

        if (response.success) {
            const tokens = response.data as AuthSuccessResponse;
            localStorage.setItem('accessToken', tokens.accessToken ?? '');
            localStorage.setItem('refreshToken', tokens.refreshToken ?? '');

            return undefined;
        }

        return response.error;
    },
    resendEmailConfirmationCode: async (userId: string): Promise<any> => {
        const response = await Api.put<{}, {}>(`/auth/resend-confirmation-code?userId=${userId}`, { userId });

        if (response.success) {
            return undefined;
        }

        return response.error;
    },
    forgotPassword: async (email: string): Promise<any> => {
        const response = await Api.post<{}, {}>('/auth/forgot-password', { email });

        if (response.success) {
            return undefined;
        }

        return response.error;
    },
    resetPassword: async (data: ResetPasswordRequest): Promise<any> => {
        const response = await Api.post<{}, {}>('/auth/reset-password', data);

        if (response.success) {
            return undefined;
        }

        return response.error;
    },
};

export default Auth;