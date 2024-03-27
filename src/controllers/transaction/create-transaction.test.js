import { faker } from '@faker-js/faker'
import { CreateTransactionController } from '../index.js'

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        async execute(transaction) {
            return transaction
        }
    }

    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(createTransactionUseCase)

        return { createTransactionUseCase, sut }
    }

    const createTransactionParams = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            amount: Number(faker.finance.amount()),
            type: 'EXPENSE',
        },
    }

    it('should return 201 when creating a transaction successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute(createTransactionParams)

        // Assert
        expect(result.statusCode).toBe(201)
    })
})
