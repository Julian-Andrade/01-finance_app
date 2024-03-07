import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    badRequest,
    created,
    serverError,
    invalidPasswordResponse,
    EmailIsAlreadyInUseResponse,
    requiredFieldIsMissingResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
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

            const { ok: requireFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requireFieldsWereProvided) {
                return requiredFieldIsMissingResponse(missingField)
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return invalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return EmailIsAlreadyInUseResponse()
            }

            // Chamar o useCase
            const createdUser = await this.createUserUseCase.execute(params)

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
