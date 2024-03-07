import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgreUpdateTransactionRepository {
    async execute(userId, updateTransactionParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateTransactionParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateTransactionParams[key])
        })

        updateValues.push(userId)

        const updateQuery = `
          UPDATE transactions
          SET ${updateFields.join(', ')}
          WHERE id = $${updateValues.length}
          RETURNING *
        `

        const updateTransaction = await PostgresHelper.query(
            updateQuery,
            updateValues,
        )

        return updateTransaction[0]
    }
}
