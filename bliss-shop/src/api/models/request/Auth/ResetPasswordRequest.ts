import { ApiRequestBase } from "../ApiRequestBase";

interface ResetPasswordRequest extends ApiRequestBase {
    resetToken: string;
    email: string;
    newPassword: string;
}

export default ResetPasswordRequest;
