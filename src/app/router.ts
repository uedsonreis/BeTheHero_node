import createRouter, { RequestHandler } from 'express'
import { Router } from "express-serve-static-core"

import { authValidator, pageValidator, deleteIdValidator, incidentCreateValidator, ngoCreateValidator, loginValidator } from './validators'

import { NGOController, IncidentController, SessionController } from './controllers'

class RouterBuilder {

    private readonly routes = createRouter()

    public getRoutes(): Router {

        this.routes.post('/sessions', loginValidator, SessionController.create)

        this.routes.get('/profile', authValidator, IncidentController.list)
        
        this.routes.get('/incidents', pageValidator, IncidentController.index)
        this.routes.post('/incidents', authValidator, incidentCreateValidator, IncidentController.create)
        this.routes.delete('/incidents/:id', authValidator, deleteIdValidator, IncidentController.delete)

        this.routes.get('/ngos', NGOController.index)
        this.routes.post('/ngos', ngoCreateValidator, NGOController.create)
        
        return this.routes
    }
}

const router = new RouterBuilder()
export default router.getRoutes()