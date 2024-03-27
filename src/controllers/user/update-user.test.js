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
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if user id is invalid', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({ params: { userId: 'invalid_id' } })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when a provided password is invalid', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })
})
