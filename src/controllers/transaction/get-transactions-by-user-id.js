import { UserNotFoundError } from '../../errors/user.js'
import {
    serverError,
    invalidUserResponse,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    checkIfIdIsValid,
    ok,
} from '../../controllers/helpers/index.js'
export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            // Verificar se o userId foi passado como parâmetro
            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            // Verificar se o userId é um ID válido
            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            // Chamar o UseCase
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })

            return ok(transactions)
        } catch (error) {
            console.error(error)

            if (error instanceof UserNotFoundError) {
                return invalidUserResponse()
            }

            return serverError()
        }
    }
}
