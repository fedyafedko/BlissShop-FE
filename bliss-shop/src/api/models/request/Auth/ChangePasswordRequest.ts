import { ApiRequestBase } from "../ApiRequestBase";

interface ChangePasswordRequest extends ApiRequestBase {
    oldPassword: string;
    newPassword: string;
};

export default ChangePasswordRequest;