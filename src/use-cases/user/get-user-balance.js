import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRespository, getUserIdRespository) {
        this.getUserBalanceRespository = getUserBalanceRespository
        this.getUserIdRespository = getUserIdRespository
    }
    async execute(userId) {
        // Verificar se o usuário existe
        const user = await this.getUserIdRespository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        // Chamar o repositório
        const balance = await this.getUserBalanceRespository.execute(userId)

        return balance
    }
}
