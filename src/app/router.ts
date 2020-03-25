import createRouter, { Request, Response, NextFunction } from 'express'
import * as core from "express-serve-static-core"

import NGOController from '../controllers/ngo.controller'
import IncidentController from '../controllers/incident.controller'

import SessionController from '../controllers/session.controller';

class RouterBuilder {

    private readonly routes = createRouter();

    public getRoutes(): core.Router {

        this.routes.post('/sessions', SessionController.create)

        this.routes.get('/profile', IncidentController.list)
        
        this.routes.get('/incidents', IncidentController.index)
        this.routes.post('/incidents', IncidentController.create)
        this.routes.delete('/incidents/:id', IncidentController.delete)

        this.routes.get('/ngos', NGOController.index)
        this.routes.post('/ngos', NGOController.create)
        
        return this.routes;
    }
}

const router = new RouterBuilder()
export default router.getRoutes()