import { UserNotFoundError } from '../../errors/user'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRespository, getUserIdRespository) {
        this.getUserBalanceRespository = getUserBalanceRespository
        this.getUserIdRespository = getUserIdRespository
    }
    async execute(params) {
        // Verificar se o usuário existe
        const user = await this.getUserByIdRepository.execute(params.userId)

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
