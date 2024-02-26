import { badRequest, notFound, ok, serverError } from './helpers.js'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            // Verificar se o id é UUID
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({ message: 'The provid id is invalid.' })
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
