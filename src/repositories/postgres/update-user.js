import { PostgreHelper } from '../../db/postgres/helper.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateFields).forEach((key) => {
            updateFields.push(`${key} = ${updateValues.length + 1}`)
            updateValues.push(updateUserParams[key])
        })

        updateValues.push(userId)

        const updateQuery = `
          UPDATE users
          SET ${updateFields.join(', ')}
          WHERE id = $${updateValues.length}
          RETURNING *
        `

        const updatedUser = PostgreHelper.query(updateQuery, updateValues)

        return updatedUser[0]
    }
}
