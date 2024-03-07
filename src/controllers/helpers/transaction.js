import validator from 'validator'
import moment from 'moment'
import { badRequest } from './http.js'

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount !== 'number') {
        return false
    }

    return validator.isCurrency(amount.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const checkIfDateIsValid = (date) => {
    return moment(date, 'YYYY-MM-DD', true).isValid()
}

export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(type)
}

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount must be a valid currency.',
    })
}

export const invalidDateResponse = () => {
    return badRequest({
        message: 'This field date need a format, YYYY-MM-DD.',
    })
}

export const invalidTypeResponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTIMENT.',
    })
}
