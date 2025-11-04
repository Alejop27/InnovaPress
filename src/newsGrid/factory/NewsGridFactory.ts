
import NewsGridModel from '../model/NewsGridModel'
import NewsGridView from '../view/NewsGridView'
import NewsGridRouter from '../router/NewsGridRouter'
import NewsRepository from '../../repository/NewsRepository'

export default class NewsGridFactory {
    private model: NewsGridModel
    private view: NewsGridView
    private router: NewsGridRouter

    private constructor(model: NewsGridModel, view: NewsGridView, router: NewsGridRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): NewsGridFactory {
        const model = new NewsGridModel(NewsRepository)
        const view = new NewsGridView(model)
        const router = new NewsGridRouter(view)
        return new NewsGridFactory(model, view, router)
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