export interface NewsGridConfig {
    itemsPerPage: number
    layout: 'grid' | 'masonry'
    columns: number
    enableModal: boolean
}

export interface GridNews {
    id: string
    title: string
    image: string
    category: string
    date: string
    likes: number
}