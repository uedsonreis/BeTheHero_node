import { RequestHandler } from "express"
import { celebrate, Segments, Joi } from "celebrate"

export const loginValidator: RequestHandler = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
})

export const authValidator: RequestHandler = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
})

export const pageValidator: RequestHandler = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
})

export const deleteIdValidator: RequestHandler = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})

export const incidentCreateValidator: RequestHandler = celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
})

export const ngoCreateValidator: RequestHandler = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
})