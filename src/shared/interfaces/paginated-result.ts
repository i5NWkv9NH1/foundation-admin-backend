export interface PaginatedResult<T> {
  items: T[]
  meta: {
    currentPage: number
    pageSize: number
    total: number
    totalPages: number
  }
}
