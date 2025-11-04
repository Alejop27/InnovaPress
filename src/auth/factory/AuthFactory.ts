
import AuthModel from '../model/AuthModel'
import AuthView from '../view/AuthView'
import AuthRouter from '../router/AuthRouter'

export default class AuthFactory {
    private model: AuthModel
    private view: AuthView
    private router: AuthRouter

    private constructor(model: AuthModel, view: AuthView, router: AuthRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): AuthFactory {
        const model = new AuthModel()
        const view = new AuthView(model)
        const router = new AuthRouter(view)
        return new AuthFactory(model, view, router)
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