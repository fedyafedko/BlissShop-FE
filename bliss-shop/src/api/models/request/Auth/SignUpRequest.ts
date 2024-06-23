import { ApiRequestBase } from "../ApiRequestBase";

interface SignUpRequest extends ApiRequestBase{
    email: string;
    password: string;
    role: string;
}

export default SignUpRequest;