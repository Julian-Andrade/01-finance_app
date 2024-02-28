import {
    checkIfIdIsValid,
    InvalidUserResponse,
    ok,
    serverError,
} from './helpers/index.js'
import { DeleteUserUseCase } from '../use-cases/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            // Verificar se o id é UUID
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            // Buscar o use case
            const deleteUserUseCase = new DeleteUserUseCase()

            // Deleta o usuário buscado
            const deletedUser = await deleteUserUseCase.execute(userId)

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
