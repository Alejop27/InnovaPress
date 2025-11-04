export interface Category {
    id: string
    name: string
    subject: string
    description: string
    icon: string
}

export interface CategoriesConfig {
    categories: Category[]
    selectedCategory: string
}