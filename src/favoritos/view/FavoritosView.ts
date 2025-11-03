import { Request, Response } from 'express'

export default class FavoritosView {
    private sortBy: 'date' | 'title' | 'category' = 'date'
    private filterBy: string = 'all'
    private itemsPerPage: number = 12

    render = (req: Request, res: Response): void => {
        try {
            const data = {
                favorites: this.getFavorites(),
                totalCount: this.getFavoritesCount(),
                sortBy: this.sortBy,
                filterBy: this.filterBy,
                itemsPerPage: this.itemsPerPage,
                currentPath: req.path
            }

            res.render('favoritos/favoritos', data)
        } catch (error) {
            console.error('Error en FavoritosView:', error)
            res.status(500).send('Error interno del servidor')
        }
    }

    // Métodos privados para obtener datos
    private getFavorites() {
        // Aquí normalmente se consultaría una base de datos o localStorage
        return [
            {
                id: '1',
                title: 'Noticia Favorita 1',
                excerpt: 'Esta es una noticia que has marcado como favorita...',
                image: '/assets/images/fav-1.jpg',
                category: 'Tecnología',
                addedDate: new Date(),
                url: '/noticia/1'
            },
            {
                id: '2',
                title: 'Noticia Favorita 2',
                excerpt: 'Otra noticia interesante guardada...',
                image: '/assets/images/fav-2.jpg',
                category: 'Tecnologia',
                addedDate: new Date(),
                url: '/noticia/2'
            }
        ]
    }

    private getFavoritesCount(): number {
        return this.getFavorites().length
    }

    // Métodos de configuración
    updateSortBy(sortBy: 'date' | 'title' | 'category'): void {
        this.sortBy = sortBy
    }

    updateFilterBy(filterBy: string): void {
        this.filterBy = filterBy
    }

    updateItemsPerPage(items: number): void {
        this.itemsPerPage = items
    }

    // Método para renderizar solo favoritos (para inyección en otros componentes)
    renderPartial(): string {
        const count = this.getFavoritesCount()
        return `<div class="favoritos"><h2>Mis Favoritos (${count})</h2></div>`
    }
}
