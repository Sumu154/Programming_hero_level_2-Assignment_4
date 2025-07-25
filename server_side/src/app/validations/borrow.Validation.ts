import { z } from 'zod';

export const borrowZod = z.object({
  book: z.string({
    required_error: 'Book Id is required',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
  }).int().positive('Quantity must be a positive number'),
  dueDate: z.coerce.date({    // date string to date object
    required_error: 'Due Date is required',
  })
})