import { faker } from '@faker-js/faker'
import { UpdateUserController } from '../index.js'
describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCase)

        return { updateUserUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    it('should return 200 when update a user', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const response = await sut.execute(httpRequest)

        // Assert
        expect(response.statusCode).toBe(200)
    })
})
