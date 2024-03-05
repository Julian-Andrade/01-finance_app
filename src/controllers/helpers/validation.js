import validator from 'validator'
import { badRequest } from './http.js'

export const InvalidUserResponse = () => {
    return badRequest({
        message: 'User is not found.',
    })
}

export const checkIfIdIsValid = (id) => validator.isUUID(id)
