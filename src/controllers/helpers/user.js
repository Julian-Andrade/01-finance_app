import validator from 'validator'
import { badRequest } from './http.js'

export const InvalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be at least 6 characters.',
    })
}

export const EmailIsAlreadyInUseResponse = () => {
    return badRequest({
        message: 'Invalid email, please provide a valid one.',
    })
}

export const InvalidIdResponse = () => {
    return badRequest({
        message: 'This provided ID is not valid.',
    })
}

export const InvalidUserResponse = () => {
    return badRequest({
        message: 'User is not found.',
    })
}

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfIdIsValid = (id) => validator.isUUID(id)
