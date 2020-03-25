import { Request, Response, NextFunction } from "express"

import sessionService from '../services/session.service'
import HTTP from "../app/http.codes"

class SessionController {

    public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { id } = request.body

        const result = await sessionService.login(id)

        if (result instanceof Error) {
            response.status(HTTP.BAD_REQUEST).send(result.message)
        } else {
            if (result) {
                response.status(HTTP.CREATED).json(result)
            } else {
                response.status(HTTP.BAD_REQUEST).send('Não há ONG com este ID.')
            }
        }
        next()
    }

}

export default new SessionController()