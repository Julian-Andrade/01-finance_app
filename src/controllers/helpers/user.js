import { badRequest } from './http.js'

export const invalidUserResponse = () => {
    return badRequest({
        message: 'User is not found.',
    })
}
