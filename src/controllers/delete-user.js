import {
    checkIfIdIsValid,
    InvalidUserResponse,
    ok,
    serverError,
} from './helpers/index.js'

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
                return InvalidIdResponse()
            }

            // Deleta o usuário buscado
            const deletedUser = await this.deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return InvalidUserResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
