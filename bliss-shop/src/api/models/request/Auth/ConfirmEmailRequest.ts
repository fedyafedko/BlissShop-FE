import { ApiRequestBase } from "../ApiRequestBase";

interface ConfirmEmailRequest extends ApiRequestBase {
    userId: string;
    code: number;
};

export default ConfirmEmailRequest;