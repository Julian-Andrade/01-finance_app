export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository
    }

    async execute(transactionId, params) {
        // Chamar o repositório
        const updateTransaction =
            await this.updateTransactionRepository.execute(
                transactionId,
                params,
            )

        return updateTransaction
    }
}
