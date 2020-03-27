import { Request, Response, NextFunction } from "express"

import { SessionService } from '../services'
import { HTTP } from "../utils"

class SessionController {

    public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { id } = request.body

        const result = await SessionService.login(id)

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