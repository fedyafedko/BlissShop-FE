interface PageListResponse<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
};

export default PageListResponse;