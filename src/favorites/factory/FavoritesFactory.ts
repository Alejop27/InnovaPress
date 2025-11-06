import FavoritesModel from '../model/FavoritesModel'
import FavoritesView from '../view/FavoritesView'
import FavoritesRouter from '../router/FavoritesRouter'


export default class FavoritesFactory {
    private model: FavoritesModel
    private view: FavoritesView
    private router: FavoritesRouter

    private constructor(model: FavoritesModel, view: FavoritesView, router: FavoritesRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): FavoritesFactory {
        const model = new FavoritesModel()  // ✅ SIN parámetros
        const view = new FavoritesView()
        const router = new FavoritesRouter(view)
        return new FavoritesFactory(model, view, router)
    }

    getRouter() {
        return this.router.router
    }

    getModel() {
        return this.model
    }

    getView() {
        return this.view
    }
}
