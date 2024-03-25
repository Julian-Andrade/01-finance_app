import { notFound } from './http.js'

export const invalidUserResponse = () => {
    return notFound({
        message: 'User is not found.',
    })
}
