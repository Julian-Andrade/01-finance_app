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

export const InvalidUserResponse = () =>
    notFound({ message: 'User not found.' })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)
