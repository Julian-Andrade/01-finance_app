import validator from 'validator'
import { badRequest } from './http.js'

export const InvalidPasswordResponse = () => {
    badRequest({
        message: 'Password must be at least 6 characters.',
    })
}

export const EmailIsAlreadyInUseResponse = () => {
    badRequest({
        message: 'Invalid email, please provide a valid one.',
    })
}

export const InvalidIdResponse = () => {
    badRequest({
        message: 'This provided ID is not valid.',
    })
}

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfIdIsValid = (id) => validator.isUUID(id)
