import { z } from 'zod'

const schema = z.object({
    query: z.string().min(1),
})

export default schema

export type SearchFormValues = z.infer<typeof schema>
