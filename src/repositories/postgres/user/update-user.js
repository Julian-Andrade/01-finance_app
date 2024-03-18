import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const user = await prisma.user.update({
            where: { id: userId },
            data: updateUserParams,
        })
        return user
    }
}
