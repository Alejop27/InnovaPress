
import { PaginationConfig, PaginationData } from '../types/PaginationTypes'

export default class PaginationModel {
    private currentPage: number = 1
    private itemsPerPage: number = 12
    private totalItems: number = 0

    setTotalItems(total: number): void {
        this.totalItems = total
    }

    setCurrentPage(page: number): void {
        this.currentPage = Math.max(1, Math.min(page, this.getTotalPages()))
    }

    getTotalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage)
    }

    getConfig(): PaginationConfig {
        return {
            currentPage: this.currentPage,
            totalPages: this.getTotalPages(),
            itemsPerPage: this.itemsPerPage,
            totalItems: this.totalItems
        }
    }

    getPaginationData(): PaginationData {
        return {
            hasPreviousPage: this.currentPage > 1,
            hasNextPage: this.currentPage < this.getTotalPages(),
            previousPage: this.currentPage > 1 ? this.currentPage - 1 : null,
            nextPage: this.currentPage < this.getTotalPages() ? this.currentPage + 1 : null
        }
    }

    getSkipItems(): number {
        return (this.currentPage - 1) * this.itemsPerPage
    }

    getPageNumbers(): number[] {
        const pages = []
        const maxButtons = 5
        const halfWindow = Math.floor(maxButtons / 2)

        let start = Math.max(1, this.currentPage - halfWindow)
        let end = Math.min(this.getTotalPages(), start + maxButtons - 1)

        if (end - start < maxButtons - 1) {
            start = Math.max(1, end - maxButtons + 1)
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        return pages
    }
}