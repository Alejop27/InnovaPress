
import PaginationModel from '../model/PaginationModel'
import PaginationView from '../view/PAginationView'
import PaginationRouter from '../router/PaginationRouter'

export default class PaginationFactory {
    private model: PaginationModel
    private view: PaginationView
    private router: PaginationRouter

    private constructor(model: PaginationModel, view: PaginationView, router: PaginationRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(totalItems: number = 0): PaginationFactory {
        const model = new PaginationModel()
        model.setTotalItems(totalItems)
        const view = new PaginationView(model)
        const router = new PaginationRouter(view)
        return new PaginationFactory(model, view, router)
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