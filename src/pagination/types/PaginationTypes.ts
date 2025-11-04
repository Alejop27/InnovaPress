export interface PaginationConfig {
    currentPage: number
    totalPages: number
    itemsPerPage: number
    totalItems: number
}

export interface PaginationData {
    hasPreviousPage: boolean
    hasNextPage: boolean
    previousPage: number | null
    nextPage: number | null
}