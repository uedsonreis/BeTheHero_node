import crypto from 'crypto'

export function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX')
}

export const HTTP = {
    BAD_REQUEST: 400,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
    OK: 200,
    UNAUTHENTICATED: 401,
    UNPROCESSABLE: 422
}