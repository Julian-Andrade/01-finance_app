import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdController } from '../index.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('GetTransactionsByUserIdController', () => {
    class GetTransactionsByUserIdUseCaseStub {
        execute() {
            return {
                id: faker.string.uuid(),
                user_id: faker.string.uuid(),
                name: faker.commerce.productName(),
                date: faker.date.anytime().toISOString(),
                amount: Number(faker.finance.amount()),
                type: 'EXPENSE',
            }
        }
    }

    const makeSut = () => {
        const getTransactionByUserIdUseCase =
            new GetTransactionsByUserIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(
            getTransactionByUserIdUseCase,
        )

        return { getTransactionByUserIdUseCase, sut }
    }

    const httpRequest = {
        query: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 when getting a transaction by user id', async () => {
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
        const result = await sut.execute({ query: { userId: 'invalid_id' } })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if user id is missing', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({ query: { userId: undefined } })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 404 if user is not found', async () => {
        // Arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        jest.spyOn(
            getTransactionByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new UserNotFoundError())

        // Action
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(404)
    })

    it('should return 500 if GetTransactionsByUserIdController throws', async () => {
        // Arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        jest.spyOn(
            getTransactionByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new Error())

        // Action
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(500)
    })

    it('should call GetTransactionsByUserIdUseCase with correct params ', async () => {
        // Arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        const executeSpy = jest.spyOn(getTransactionByUserIdUseCase, 'execute')

        const userId = faker.string.uuid()

        // Action
        await sut.execute({
            query: {
                userId,
            },
        })

        // Assert
        expect(executeSpy).toHaveBeenCalledWith(userId)
    })
})
