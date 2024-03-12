import {
    checkIfIdIsValid,
    invalidIdResponse,
    invalidUserResponse,
    ok,
    serverError,
} from '../../controllers/helpers/index.js'
import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const balance = await this.getUserBalanceUseCase.execute({ userId })

            return ok(balance)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return invalidUserResponse()
            }

            console.error(error)

            return serverError()
        }
    }
}
