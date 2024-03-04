import {
    PostgresGetUserByIdRepository,
    PostgresCreateTransactionRepository,
} from '../../repositories/postgres/index.js'
import { CreateTransactionUseCase } from '../../use-cases/index.js'
import { CreateTransactionController } from '../controllers/index.js'

export const makeCreateTransactionController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        getUserByIdRepository,
        createTransactionRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}
