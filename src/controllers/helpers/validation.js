import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () => {
    return badRequest({
        message: 'This provided ID is not valid.',
    })
}

export const requiredFieldIsMissingResponse = (field) => {
    return badRequest({
        message: `Missing param: ${field}`,
    })
}
