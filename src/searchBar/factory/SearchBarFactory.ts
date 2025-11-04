
import SearchBarModel from '../model/SearchBarModel'
import SearchBarView from '../view/SearchBarView'
import SearchBarRouter from '../router/SearchBarRouter'
import NewsRepository from '../../repository/NewsRepository'

export default class SearchBarFactory {
    private model: SearchBarModel
    private view: SearchBarView
    private router: SearchBarRouter

    private constructor(model: SearchBarModel, view: SearchBarView, router: SearchBarRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): SearchBarFactory {
        const model = new SearchBarModel(NewsRepository)
        const view = new SearchBarView(model)
        const router = new SearchBarRouter(view)
        return new SearchBarFactory(model, view, router)
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