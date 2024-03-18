import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        return prisma.transaction.create({
            data: {
                id: createTransactionParams.id,
                user_id: createTransactionParams.user_id,
                name: createTransactionParams.name,
                date: createTransactionParams.date,
                amount: createTransactionParams.amount,
                type: createTransactionParams.type,
            },
        })
    }
}
