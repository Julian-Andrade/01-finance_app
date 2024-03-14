import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z
        .string({
            required_error: 'First name is required.',
        })
        .trim()
        .min(1, {
            message: 'Please provide a valid first name',
        }),
    last_name: z
        .string({
            required_error: 'Last name is required.',
        })
        .trim()
        .min(1, {
            message: 'Please provide a valid last name',
        }),
    email: z
        .string({
            required_error: 'Email is required.',
        })
        .email({
            message: 'Please provide a valid email address',
        })
        .trim()
        .min(1, {
            message: 'Please provide a valid email address',
        }),
    password: z
        .string({
            required_error: 'Password is required.',
        })
        .trim()
        .min(6, {
            message: 'Password must be at least 6 characters',
        }),
})

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Some provided field is not allowed.',
})
