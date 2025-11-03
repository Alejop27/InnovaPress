import { Router } from 'express'
import GrydView from '../view/GrydView'
import GrydRouter from '../router/GrydRouter'

export default class GrydFactory {
    public readonly view: GrydView
    public readonly router: Router

    private constructor(view: GrydView, router: GrydRouter) {
        this.view = view
        this.router = router.router
    }

    static createComponent(): GrydFactory {
        const view = new GrydView()
        const router = new GrydRouter(view)
        return new GrydFactory(view, router)
    }

    static createComponentWithConfig(
        columns: number = 3,
        gap: string = '2rem',
        layout: 'masonry' | 'standard' | 'featured' = 'standard'
    ): GrydFactory {
        const view = new GrydView()
        const router = new GrydRouter(view)

        // Configurar el view con los parámetros
        view.updateColumns(columns)
        view.updateGap(gap)
        view.updateLayout(layout)

        return new GrydFactory(view, router)
    }

    // Método para obtener solo el router si se necesita
    getRouter(): Router {
        return this.router
    }

    // Método para obtener solo el view si se necesita
    getView(): GrydView {
        return this.view
    }
}
