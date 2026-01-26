export interface APIResponse<T> {
    data: T;
    message: string;
    statusCode: number;
}

export interface PaginationParams {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
