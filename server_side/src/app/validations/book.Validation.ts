import { z } from 'zod';

export const bookZod = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  author: z.string({
    required_error: 'Author is required',
  }),
  genre: z.enum(['FICTION' , 'NON_FICTION' , 'SCIENCE' , 'HISTORY' , 'BIOGRAPHY' , 'FANTASY'], {
    required_error: 'Genre is required',
  }),
  isbn: z.string({
    required_error: 'ISBN is required',
  }),
  description: z.string().optional(),
  copies: z.number({
    required_error: 'Copies is required',
  }).int().nonnegative(),
  available: z.boolean().default(true)
})