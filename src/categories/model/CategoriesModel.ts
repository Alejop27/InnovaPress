
import { Category, CategoriesConfig } from '../types/CategoriesTypes'

export default class CategoriesModel {
    private categories: Category[] = [
        {
            id: '1',
            name: 'Integrador I',
            subject: 'Integrador I',
            description: 'Proyectos del primer integrador',
            icon: 'book'
        },
        {
            id: '2',
            name: 'Integrador II',
            subject: 'Integrador II',
            description: 'Proyectos del segundo integrador',
            icon: 'book'
        },
        {
            id: '3',
            name: 'Integrador III',
            subject: 'Integrador III',
            description: 'Proyectos del tercer integrador',
            icon: 'book'
        },
        {
            id: '4',
            name: 'Ing. Software',
            subject: 'Ing Software',
            description: 'Proyectos de ingeniería de software',
            icon: 'code'
        },
        {
            id: '5',
            name: 'Estructura de Datos',
            subject: 'Estructura Datos',
            description: 'Proyectos de estructura de datos',
            icon: 'sitemap'
        },
        {
            id: '6',
            name: 'Sistemas Distribuidos',
            subject: 'Sistemas Distribuidos',
            description: 'Proyectos de sistemas distribuidos',
            icon: 'network'
        }
    ]

    private selectedCategory: string = 'all'

    getCategories(): Category[] {
        return this.categories
    }

    getConfig(): CategoriesConfig {
        return {
            categories: this.categories,
            selectedCategory: this.selectedCategory
        }
    }

    setSelectedCategory(category: string): void {
        this.selectedCategory = category
    }

    getSelectedCategory(): string {
        return this.selectedCategory
    }

    getCategoryById(id: string): Category | undefined {
        return this.categories.find(c => c.id === id)
    }
}