import { Request, Response, NextFunction } from "express"

import ngoService from '../services/ngo.service'
import HTTP from "../app/http.codes"
import { NGO } from "../entities"

class NGOController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<void> {
        const result = await ngoService.list()

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.status(HTTP.CREATED).json(result)
        }
        next()
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
        const ngo = request.body as NGO

        const result = await ngoService.create(ngo)

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.status(HTTP.CREATED).json(result)
        }
        next()
    }
}

export default new NGOController()