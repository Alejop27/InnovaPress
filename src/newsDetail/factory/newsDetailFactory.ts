import NewsDetailModel from '../model/NewsDetailModel'
import NewsDetailView from '../view/NewsDetailView'
import NewsDetailRouter from '../router/NewsDetailRouter'

export default class NewsDetailFactory {
    private model: NewsDetailModel
    private view: NewsDetailView
    private router: NewsDetailRouter

    private constructor(model: NewsDetailModel, view: NewsDetailView, router: NewsDetailRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): NewsDetailFactory {
        const model = new NewsDetailModel()  // ✅ SIN parámetros
        const view = new NewsDetailView(model)
        const router = new NewsDetailRouter(view)
        return new NewsDetailFactory(model, view, router)
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
