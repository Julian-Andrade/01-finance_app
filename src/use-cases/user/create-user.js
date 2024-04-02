import { v4 as uuidv4 } from 'uuid'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdapater,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.createUserRepository = createUserRepository
        this.passwordHasherAdapater = passwordHasherAdapater
    }
    async execute(createUserParams) {
        // Verificar se o e-mail já está em uso
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        // Gerar o id do usuário
        const userId = uuidv4()

        // Criptografar a senha
        const hashedPassword = await this.passwordHasherAdapater.execute(
            createUserParams.password,
        )

        // Inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // Chamar o repositório
        const createdUser = await this.createUserRepository.execute(user)

        return createdUser
    }
}
