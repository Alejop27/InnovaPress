
import HeroModel from '../model/HeroModel'
import HeroView from '../view/HeroView'
import HeroRouter from '../router/HeroRouter'

export default class HeroFactory {
    private model: HeroModel
    private view: HeroView
    private router: HeroRouter

    private constructor(model: HeroModel, view: HeroView, router: HeroRouter) {
        this.model = model
        this.view = view
        this.router = router
    }

    static create(): HeroFactory {
        const model = new HeroModel()
        const view = new HeroView(model)
        const router = new HeroRouter(view)
        return new HeroFactory(model, view, router)
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