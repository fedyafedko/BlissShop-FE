import { ApiRequestBase } from "../ApiRequestBase";

interface SearchProductRequest extends ApiRequestBase {
    search: string;
    page: number;
    pageSize: number;
};

export default SearchProductRequest;