import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRespository, getUserIdRespository) {
        this.getUserBalanceRespository = getUserBalanceRespository
        this.getUserIdRespository = getUserIdRespository
    }
    async execute(params) {
        // Verificar se o usuário existe
        const user = await this.getUserIdRespository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        // Chamar o repositório
        const balance = await this.getUserBalanceRespository.execute(
            params.userId,
        )

        return balance
    }
}
