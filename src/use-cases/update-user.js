import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
} from '../repositories/postgres/index.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // Se o e-mail estiver sendo atualizado, verificar se está em uso
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }
        // Se a senha estiver sendo atualizada, criptografá-la
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }
        // Chamar o repository para atualizar o usuário
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
