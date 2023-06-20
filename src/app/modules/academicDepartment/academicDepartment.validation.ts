import { z } from 'zod';
import { validateObjectId } from '../student/student.utils';

export const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(3),
    academicFaculty: z
      .string({
        required_error: 'Academic Faculty is required',
        invalid_type_error: 'Academic Faculty must be a string',
      })
      .refine(validateObjectId, {
        message: 'Invalid Academic Faculty ObjectId',
      }),
  }),
});

export const updateAcademicDepartmentZodSchema =
  createAcademicDepartmentZodSchema.deepPartial();
