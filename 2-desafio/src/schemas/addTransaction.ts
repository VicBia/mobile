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
    type: z.object({
        value: z.enum(['income', 'expense']),
        label: z.string(),
    }),
    amount: z
        .string({ required_error: 'O valor não pode ser vazio' })
        .refine(value => Number(value) > 0, {
            message: 'O valor deve ser maior que zero',
        }),
})

export type AddTransactionSchemaType = z.infer<typeof addTransactionSchema>
