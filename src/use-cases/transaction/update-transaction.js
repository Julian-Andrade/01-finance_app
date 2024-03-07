import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionUseCase {
    constructor(getUserByIdRepository, updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params) {
        // Verificar se o usuário existe
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        // Chamar o repositório
        const updateTransaction =
            await this.updateTransactionRepository.execute(params)

        return updateTransaction
    }
}
