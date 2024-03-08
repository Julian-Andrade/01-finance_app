import {
    checkIfIdIsValid,
    invalidUserResponse,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            // Verificar se o id é UUID
            const transactionId = httpRequest.params.transactionId

            const isIdValid = checkIfIdIsValid(transactionId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            // Deleta o usuário buscado
            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId)

            if (!deletedTransaction) {
                return invalidUserResponse()
            }

            return ok(deletedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
