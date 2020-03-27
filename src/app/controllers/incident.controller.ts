import { Request, Response, NextFunction } from "express"

import { IncidentService } from '../services'
import { Incident } from "../entities"
import { HTTP } from "../utils"

class IncidentController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { page = 1 } = request.query

        const result = await IncidentService.list(page)
        const size = await IncidentService.count()

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.header('Access-Control-Expose-Headers', 'X-Total-Count')
            response.header('X-Total-Count', size.toString())
            response.status(HTTP.OK).json(result)
        }
        next()
    }

    public async list(request: Request, response: Response, next: NextFunction): Promise<void> {
        const ngo_id = request.headers.authorization!

        const result = await IncidentService.filter(ngo_id)

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

        const result = await IncidentService.create(incident)

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

        const result = await IncidentService.delete({ id: Number(id), ngo_id } as Incident)

        if (result instanceof Error) {
            response.status(HTTP.UNAUTHENTICATED).send(result.message)
        } else {
            response.status(HTTP.OK).json(result)
        }
        next()
    }
}

export default new IncidentController()