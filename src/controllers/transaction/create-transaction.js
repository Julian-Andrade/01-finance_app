import validator from 'validator'
import {
    InvalidIdResponse,
    InvalidAmountResponse,
    InvalidTypeResponse,
    checkIfIdIsValid,
    created,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = [
                'id',
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}.` })
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.user.id)

            if (!userIdIsValid) {
                return InvalidIdResponse()
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: `The amount must be greater than 0.`,
                })
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsValid) {
                return InvalidAmountResponse()
            }

            const type = params.type.trim().toUpperCase()

            const requiredTypes = [
                'EARNING',
                'EXPENSE',
                'INVESTIMENT',
            ].includes(type)

            if (!requiredTypes) {
                return InvalidTypeResponse()
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
