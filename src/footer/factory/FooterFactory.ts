
import FooterModel from '../model/FooterModel'
import FooterView from '../view/FooterView'
import FooterRouter from '../router/FooterRouter'

export default class FooterFactory {
    private model: FooterModel
    private view: FooterView
    private router: FooterRouter

    private constructor(model: FooterModel, view: FooterView, router: FooterRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): FooterFactory {
        const model = new FooterModel()
        const view = new FooterView(model)
        const router = new FooterRouter(view)
        return new FooterFactory(model, view, router)
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