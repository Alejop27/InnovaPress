export interface DetailNews {
    id: string
    title: string
    subtitle: string
    content: string
    image: string
    category: string
    subject: string
    date: string
    author: string
    likes: number
    isFavorite: boolean
    comments: DetailComment[]
}

export interface DetailComment {
    id: string
    author: string
    text: string
    date: string
    docent: boolean
}