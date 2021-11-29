export interface Pagination{


    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }
  
  export class PaginatedResult<T>{
    result: T;
    pagination: Pagination;
  }
  