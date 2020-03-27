import { Request, Response, NextFunction } from "express"

import { NGOService } from '../services'
import { HTTP } from "../utils"
import { NGO } from "../entities"

class NGOController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<void> {
        const result = await NGOService.list()

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.status(HTTP.OK).json(result)
        }
        next()
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
        const ngo = request.body as NGO

        const result = await NGOService.create(ngo)

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            response.status(HTTP.CREATED).json(result)
        }
        next()
    }
}

export default new NGOController()