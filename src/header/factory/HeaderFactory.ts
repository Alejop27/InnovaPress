import { Router } from 'express'
import HeaderView from '../view/HeaderView'
import HeaderRouter from '../router/HeaderRouter'

export default class HeaderFactory {
    public readonly view: HeaderView
    public readonly router: Router

    private constructor(view: HeaderView, router: HeaderRouter) {
        this.view = view
        this.router = router.router
    }

    static createComponent(): HeaderFactory {
        const view = new HeaderView()
        const router = new HeaderRouter(view)

        return new HeaderFactory(view, router)
    }

    static createComponentWithConfig(
        siteName: string,
        logo: string,
        isSticky: boolean = true
    ): HeaderFactory {
        const view = new HeaderView()
        const router = new HeaderRouter(view)

        // Configurar el view con los parámetros
        view.updateSiteName(siteName)
        view.updateLogo(logo)
        view.setSticky(isSticky)

        return new HeaderFactory(view, router)
    }

    // Método para obtener solo el router si se necesita
    getRouter(): Router {
        return this.router
    }

    // Método para obtener solo el view si se necesita
    getView(): HeaderView {
        return this.view
    }
}