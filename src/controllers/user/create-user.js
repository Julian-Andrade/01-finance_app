import { EmailAlreadyInUseError } from '../../errors/user.js'
import { badRequest, created, serverError } from '../helpers/index.js'
import { createUserSchema } from '../../schemas/user.js'
import { ZodError } from 'zod'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            // Chamar o useCase
            const createdUser = await this.createUserUseCase.execute(params)

            // Retornar a resposta para o usuário (status code)
            return created(createdUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)

            return serverError()
        }
    }
}
