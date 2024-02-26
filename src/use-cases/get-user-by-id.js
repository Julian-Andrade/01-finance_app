import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        // Chamar o repositório
        const postgresGetUserByIdRepository =
            new PostgresGetUserByIdRepository()

        const user = await postgresGetUserByIdRepository.execute(userId)

        return user
    }
}
