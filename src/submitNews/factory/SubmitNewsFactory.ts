
import SubmitNewsModel from '../model/SubmitNewsModel'
import SubmitNewsView from '../view/SubmitNewsView'
import SubmitNewsRouter from '../router/SubmitNewsRouter'

export default class SubmitNewsFactory {
    private model: SubmitNewsModel
    private view: SubmitNewsView
    private router: SubmitNewsRouter

    private constructor(model: SubmitNewsModel, view: SubmitNewsView, router: SubmitNewsRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): SubmitNewsFactory {
        const model = new SubmitNewsModel()
        const view = new SubmitNewsView(model)
        const router = new SubmitNewsRouter(view)
        return new SubmitNewsFactory(model, view, router)
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