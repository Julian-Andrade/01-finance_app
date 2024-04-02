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

    it('should return 201 when creating a transaction successfully (expense)', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute(createTransactionParams)

        // Assert
        expect(result.statusCode).toBe(201)
    })

    it('should return 201 when creating a transaction successfully (earning)', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: {
                ...createTransactionParams.body,
                type: 'EARNING',
            },
        })

        // Assert
        expect(result.statusCode).toBe(201)
    })

    it('should return 400 when not provided an user_id', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: { ...createTransactionParams.body, user_id: undefined },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 201 when creating a transaction successfully (investment)', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: {
                ...createTransactionParams.body,
                type: 'INVESTMENT',
            },
        })

        // Assert
        expect(result.statusCode).toBe(201)
    })

    it('should return 400 when not provided a name', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: { ...createTransactionParams.body, name: undefined },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when not provided a date', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: { ...createTransactionParams.body, date: undefined },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when not provided an amount', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: { ...createTransactionParams.body, amount: undefined },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when not provided a type', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: { ...createTransactionParams.body, type: undefined },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when amount provided is not a valid currency', async () => {
        // Arrange
        const { sut } = makeSut()

        // Action
        const result = await sut.execute({
            body: { ...createTransactionParams.body, amount: 'invalid_amount' },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 500 if CreationTransactionUseCase throws', async () => {
        // Arrange
        const { sut, createTransactionUseCase } = makeSut()
        jest.spyOn(createTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // Action
        const result = await sut.execute(createTransactionParams)

        // Assert
        expect(result.statusCode).toBe(500)
    })

    it('should call CreateTransactionController with correct params ', async () => {
        // Arrange
        const { sut, createTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(createTransactionUseCase, 'execute')

        // Action
        await sut.execute(createTransactionParams)

        // Assert
        expect(executeSpy).toHaveBeenCalledWith(createTransactionParams.body)
    })
})
