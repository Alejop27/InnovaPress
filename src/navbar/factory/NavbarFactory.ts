import { Router } from 'express'
import NavbarView from '../view/NavBarView'
import NavbarRouter from '../router/NavBarRouter'

export default class NavbarFactory {
    public readonly view: NavbarView
    public readonly router: Router

    private constructor(view: NavbarView, router: NavbarRouter) {
        this.view = view
        this.router = router.router
    }

    static createComponent(): NavbarFactory {
        const view = new NavbarView()
        const router = new NavbarRouter(view)
        return new NavbarFactory(view, router)
    }

    static createComponentWithConfig(
        showSearch: boolean = true,
        showUserMenu: boolean = true,
        currentSection: string = 'inicio'
    ): NavbarFactory {
        const view = new NavbarView()
        const router = new NavbarRouter(view)

        // Configurar el view con los parámetros
        view.toggleSearch(showSearch)
        view.toggleUserMenu(showUserMenu)
        view.updateCurrentSection(currentSection)

        return new NavbarFactory(view, router)
    }

    // Método para obtener solo el router si se necesita
    getRouter(): Router {
        return this.router
    }

    // Método para obtener solo el view si se necesita
    getView(): NavbarView {
        return this.view
    }
}
