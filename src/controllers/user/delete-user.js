import {
    checkIfIdIsValid,
    invalidUserResponse,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(httpRequest) {
        try {
            // Verificar se o id é UUID
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            // Deleta o usuário buscado
            const deletedUser = await this.deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return invalidUserResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
