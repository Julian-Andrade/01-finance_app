import {
    ok,
    serverError,
    checkIfIdIsValid,
    invalidIdResponse,
    invalidUserResponse,
} from '../helpers/index.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }
    async execute(httpRequest) {
        try {
            // Verificar se o id é UUID
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            // Retorna o usuário buscado
            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            // Verifica se existe o usuário no banco de dados
            if (!user) {
                return invalidUserResponse()
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
