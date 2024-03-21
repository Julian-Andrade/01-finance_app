import { CreateUserController } from '../index.js'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 201 when creating a new user', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Julian',
                last_name: 'Andrade',
                email: 'julian@andrade.com',
                password: '123456',
            },
        }

        // Action
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                last_name: 'Andrade',
                email: 'julian@andrade.com',
                password: '123456',
            },
        }

        // Action
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(400)
    })
})
