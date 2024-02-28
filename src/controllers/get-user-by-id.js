import {
    notFound,
    ok,
    serverError,
    checkIfIdIsValid,
    InvalidIdResponse,
} from './helpers/index.js'
import { GetUserByIdUseCase } from '../use-cases/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            // Verificar se o id é UUID
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            // Buscar o use case
            const getUserByIdUseCase = new GetUserByIdUseCase()

            // Retorna o usuário buscado
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            // Verifica se existe o usuário no banco de dados
            if (!user) {
                return notFound({ message: 'User not found.' })
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
