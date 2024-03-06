import { userNotFoundRepsonse } from '../../controllers/helpers/index.js'

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        // Verificar se o usuário existe
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            return userNotFoundRepsonse()
        }
        // Chamar o repositório
        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.userId)

        return transactions
    }
}
