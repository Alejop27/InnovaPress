import { Router } from 'express'
import InicioView from '../view/InicioView'
import InicioRouter from '../router/InicioRouter'

export default class InicioFactory {
    public readonly view: InicioView
    public readonly router: Router

    private constructor(view: InicioView, router: InicioRouter) {
        this.view = view
        this.router = router.router
    }

    static createComponent(): InicioFactory {
        const view = new InicioView()
        const router = new InicioRouter(view)
        return new InicioFactory(view, router)
    }

    static createComponentWithConfig(
        heroTitle: string,
        heroSubtitle: string,
        heroImage: string
    ): InicioFactory {
        const view = new InicioView()
        const router = new InicioRouter(view)

        // Configurar el view con los parámetros
        view.updateHeroTitle(heroTitle)
        view.updateHeroSubtitle(heroSubtitle)
        view.updateHeroImage(heroImage)

        return new InicioFactory(view, router)
    }

    // Método para obtener solo el router si se necesita
    getRouter(): Router {
        return this.router
    }

    // Método para obtener solo el view si se necesita
    getView(): InicioView {
        return this.view
    }
}
