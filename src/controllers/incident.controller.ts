import { Request, Response, NextFunction } from "express"

import incidentService from '../services/incident.service'
import { Incident } from "../entities"
import HTTP from "../app/http.codes"

class IncidentController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { page = 1 } = request.query

        const result = await incidentService.list(page)
        const size = await incidentService.count()

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.header('X-Total-Count', size.toString())
            response.status(HTTP.CREATED).json(result)
        }
        next()
    }

    public async list(request: Request, response: Response, next: NextFunction): Promise<void> {
        const ngo_id = request.headers.authorization!

        const result = await incidentService.filter(ngo_id)

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.status(HTTP.CREATED).json(result)
        }
        next()
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
        const incident = request.body as Incident
        incident.ngo_id = request.headers.authorization!

        const result = await incidentService.create(incident)

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.status(HTTP.CREATED).json(result)
        }
        next()
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { id } = request.params
        const ngo_id = request.headers.authorization

        const result = await incidentService.delete({ id: Number(id), ngo_id } as Incident)

        if (result instanceof Error) {
            response.status(HTTP.UNAUTHENTICATED).send(result.message)
        } else {
            response.status(HTTP.NO_CONTENT)
        }
        next()
    }
}

export default new IncidentController()