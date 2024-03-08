export class DeleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository
    }
    async execute(transactionId) {
        const deletedTransaction =
            this.deleteTransactionRepository.execute(transactionId)

        return deletedTransaction
    }
}
