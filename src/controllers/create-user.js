import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import validator from 'validator'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            // Validar a requisição (campos obrigatórios, email e senha)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}.` })
                }
            }

            const passwodIsValid = params.password.length < 6

            if (passwodIsValid) {
                return badRequest({
                    message: 'Password must be at least 6 characters.',
                })
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid email, please provide a valid one.',
                })
            }

            // Chamar o useCase
            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            // Retornar a resposta para o usuário (status code)
            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)

            return serverError()
        }
    }
}
