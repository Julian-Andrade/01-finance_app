import { UpdateUserUseCase } from '../use-cases/index.js'
import {
    badRequest,
    serverError,
    ok,
    InvalidPasswordResponse,
    EmailIsAlreadyInUseResponse,
    InvalidIdResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    checkIfIdIsValid,
} from './helpers/index.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const updateUserParams = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({ message: 'Some field is not allowed.' })
            }

            if (updateUserParams.password) {
                const passwordIsValid = checkIfPasswordIsValid(
                    updateUserParams.password,
                )

                if (!passwordIsValid) {
                    return InvalidPasswordResponse()
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = checkIfEmailIsValid(updateUserParams.email)

                if (!emailIsValid) {
                    return EmailIsAlreadyInUseResponse()
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError(error)
        }
    }
}
