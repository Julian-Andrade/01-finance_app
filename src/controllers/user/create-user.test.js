import { CreateUserController } from '../index.js'

describe('Create User Controller', () => {
    it('should return 201 when creating a new user', async () => {
        class CreateUserUseCaseStub {
            execute(user) {
                return user
            }
        }

        // Arrange
        const createUserController = new CreateUserController(
            new CreateUserUseCaseStub(),
        )

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
})
