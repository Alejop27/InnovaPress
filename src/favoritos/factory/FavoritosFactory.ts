import { Router } from 'express'
import FavoritosView from '../view/FavoritosView'
import FavoritosRouter from '../router/FavoritosRouter'

export default class FavoritosFactory {
    public readonly view: FavoritosView
    public readonly router: Router

    private constructor(view: FavoritosView, router: FavoritosRouter) {
        this.view = view
        this.router = router.router
    }

    static createComponent(): FavoritosFactory {
        const view = new FavoritosView()
        const router = new FavoritosRouter(view)
        return new FavoritosFactory(view, router)
    }

    static createComponentWithConfig(
        sortBy: 'date' | 'title' | 'category' = 'date',
        filterBy: string = 'all',
        itemsPerPage: number = 12
    ): FavoritosFactory {
        const view = new FavoritosView()
        const router = new FavoritosRouter(view)

        // Configurar el view con los parámetros
        view.updateSortBy(sortBy)
        view.updateFilterBy(filterBy)
        view.updateItemsPerPage(itemsPerPage)

        return new FavoritosFactory(view, router)
    }

    // Método para obtener solo el router si se necesita
    getRouter(): Router {
        return this.router
    }

    // Método para obtener solo el view si se necesita
    getView(): FavoritosView {
        return this.view
    }
}
