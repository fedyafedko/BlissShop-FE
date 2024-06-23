import { ApiRequestBase } from "../ApiRequestBase";

interface RefreshTokenRequest extends ApiRequestBase {
    refreshToken: string;
    accessToken: string;
}

export default RefreshTokenRequest;