export interface SystemLog {
    id: string;
    action: string;
    targetId: string;
    targetType: string;
    details: {
        name?: string;
        [key: string]: any;
    };
    createdAt: string;
}

export interface SystemLogsResponse {
    message: string;
    data: SystemLog[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
