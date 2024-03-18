import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalInvestiments },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTIMENT',
            },
            _sum: {
                amount: true,
            },
        })

        const balance = totalEarnings - (totalExpenses + totalInvestiments)

        return {
            earnings: totalEarnings,
            expenses: totalExpenses,
            investiments: totalInvestiments,
            balance,
        }
    }
}
