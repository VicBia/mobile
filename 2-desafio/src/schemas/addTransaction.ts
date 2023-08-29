import { z } from 'zod'

export const addTransactionSchema = z.object({
    description: z
        .string({ required_error: 'O descrição não pode ser vazia' })
        .min(3, {
            message: 'O descrição deve ter no mínimo 3 caracteres',
        })
        .max(255, {
            message: 'O descrição deve ter no máximo 255 caracteres',
        }),
    type: z.enum(['income', 'expense'], {
        required_error: 'O tipo não pode ser vazio',
    }),
    amount: z
        .string({ required_error: 'O valor não pode ser vazio' })
        .transform(Number)
        .refine(value => value > 0, {
            message: 'O valor deve ser maior que zero',
        }),
})

export type AddTransactionSchemaType = z.infer<typeof addTransactionSchema>
