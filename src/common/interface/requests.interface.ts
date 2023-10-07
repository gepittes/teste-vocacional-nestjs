export interface Paginated<T> {
  items: T[];
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface ListResponse<T> {
  items: T[];
}

export interface AppResponse<T> {
  success: {
    response: T;
    requestMetadata: {
      requestId: string;
      timestamp: string;
    };
    requestInfo: any;
  };
  error: {
    message?: string;
    statusCode?: number;
  };
}

export interface PaginatedRequest {
  pageIndex: number;
  pageSize: number;
}
