import { faker } from '@faker-js/faker'
import { UpdateTransactionController } from '../index.js'
describe('UpdateTransactionController', () => {
    class UpdateTransactionUseCaseStub {
        execute(transaction) {
            return transaction
        }
    }

    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)

        return { updateTransactionUseCase, sut }
    }

    const httpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            amount: Number(faker.finance.amount()),
            type: 'EXPENSE',
        },
    }

    it('should return 200 when successfully update transaction', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(200)
    })

    it('should return 400 when transaction id is invalid', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            params: { transactionId: 'invalid_id' },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })
})
