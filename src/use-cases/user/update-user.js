import { EmailAlreadyInUseError } from '../../errors/user.js'
export class UpdateUserUseCase {
    constructor(
        getUserByEmailRepository,
        updateUserRepository,
        passwordHasherAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.updateUserRepository = updateUserRepository
        this.passwordHasherAdapter = passwordHasherAdapter
    }
    async execute(userId, params) {
        // Se o e-mail estiver sendo atualizado, verificar se está em uso
        if (params.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(params.email)

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(params.email)
            }
        }

        const user = {
            ...params,
        }
        // Se a senha estiver sendo atualizada, criptografá-la
        if (params.password) {
            const hashedPassword = await this.passwordHasherAdapter.execute(
                params.password,
            )

            user.password = hashedPassword
        }
        // Chamar o repository para atualizar o usuário
        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
