import { CreateUserUseCase } from '../use-cases/index.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    badRequest,
    created,
    serverError,
    InvalidPasswordResponse,
    EmailIsAlreadyInUseResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
} from './helpers/index.js'

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

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return InvalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return EmailIsAlreadyInUseResponse()
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
