import { ApiRequestBase } from "../ApiRequestBase";

interface SignUpGoogleRequest extends ApiRequestBase{
    code: string;
    role: string;
}

export default SignUpGoogleRequest;