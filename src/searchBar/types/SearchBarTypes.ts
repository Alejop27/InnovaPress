export interface SearchConfig {
    placeholder: string
    enableFilters: boolean
    filterOptions: string[]
}

export interface SearchResult {
    id: string
    title: string
    category: string
    date: string
}