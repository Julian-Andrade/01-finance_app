import {
    InvalidIdResponse,
    InvalidAmountResponse,
    InvalidTypeResponse,
    requiredFieldIsMissingResponse,
    checkIfIdIsValid,
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    created,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            const { ok: requireFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requireFieldsWereProvided) {
                return requiredFieldIsMissingResponse(missingField)
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id)

            if (!userIdIsValid) {
                return InvalidIdResponse()
            }

            const amountIsValid = checkIfAmountIsValid(params.amount)

            if (!amountIsValid) {
                return InvalidAmountResponse()
            }

            const type = params.type.trim().toUpperCase()

            const requiredTypes = checkIfTypeIsValid(type)

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
