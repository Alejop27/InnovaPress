
import HeaderModel from '../model/HeaderModel'
import HeaderView from '../view/HeaderView'
import HeaderRouter from '../router/HeaderRouter'

export default class HeaderFactory {
    private model: HeaderModel
    private view: HeaderView
    private router: HeaderRouter

    private constructor(model: HeaderModel, view: HeaderView, router: HeaderRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): HeaderFactory {
        const model = new HeaderModel()
        const view = new HeaderView(model)
        const router = new HeaderRouter(model, view)
        return new HeaderFactory(model, view, router)
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