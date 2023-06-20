import { z } from 'zod';

export const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .refine((val) => /^Faculty of [A-Za-z\s&]+$/.test(val), {
        message:
          'Invalid faculty name. Faculty name must be started with Faculty of ...',
      }),
  }),
});

export const updateAcademicFacultyZodSchema = createAcademicFacultyZodSchema;
