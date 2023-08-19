import { z } from 'zod';

export const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
      invalid_type_error: 'Id must be a string',
    }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  }),
});
