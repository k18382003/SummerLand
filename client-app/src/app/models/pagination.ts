export interface Pagination {
    currentPage: number;
    itemPerPage: number;
    totalPage: number;
    totalItems: number;
}

export class PaginatedResult<T> {
    data: T;
    pagination: Pagination;

    constructor(_data: T, _pagination: Pagination) {
        this.data = _data;
        this.pagination = _pagination;
    }
}

export class PageParams {
    pageNumber: number
    pageSize: number

    constructor(pageNumber = 1, pageSize = 5) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize
    }
}