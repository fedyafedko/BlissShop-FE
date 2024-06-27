import { ApiRequestBase } from "../ApiRequestBase";

interface CreateProductRequest extends ApiRequestBase {
    shopId: string;
    categoryId: string;
    name: string;
    price: number;
    description: string;
    tags: string[];
    quantity: number;
};

export default CreateProductRequest;