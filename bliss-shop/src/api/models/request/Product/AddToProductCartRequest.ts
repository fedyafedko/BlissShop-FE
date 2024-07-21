import { ApiRequestBase } from "../ApiRequestBase";

interface AddToProductCartRequest extends ApiRequestBase {
    productId: string;
    quantity: number;
}

export default AddToProductCartRequest;