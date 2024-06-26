import { z } from 'zod'
import validator from 'validator'

export const createTransactionSchema = z.object({
    user_id: z
        .string({
            required_error: 'User id is required.',
        })
        .uuid({ message: 'User id must be a valid UUID.' }),
    name: z
        .string({
            required_error: 'Name is required.',
        })
        .trim()
        .min(1, {
            message: 'Please provide a valid name.',
        }),
    date: z
        .string({
            required_error: 'Date is required.',
        })
        .datetime({
            message: 'Date must be a valid Date.',
        }),
    amount: z
        .number({
            invalid_type_error: 'Amount is not a number.',
        })
        .min(1, {
            message: 'Please provide a valid amount.',
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            }),
        ),
    type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
        errorMap: () => ({
            message: 'Type must be EXPENSE, EARNING or INVESTMENT.',
        }),
    }),
})

export const updateTransactionSchema = createTransactionSchema
    .omit({
        user_id: true,
    })
    .partial()
    .strict({
        message: 'Some provided field is not allowed.',
    })
