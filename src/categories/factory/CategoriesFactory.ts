
import CategoriesModel from '../model/CategoriesModel'
import CategoriesView from '../view/CategoriesView'
import CategoriesRouter from '../router/CAtegoriesRouter'

export default class CategoriesFactory {
    private model: CategoriesModel
    private view: CategoriesView
    private router: CategoriesRouter

    private constructor(model: CategoriesModel, view: CategoriesView, router: CategoriesRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): CategoriesFactory {
        const model = new CategoriesModel()
        const view = new CategoriesView(model)
        const router = new CategoriesRouter(view)
        return new CategoriesFactory(model, view, router)
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