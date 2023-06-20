import { z } from 'zod';
import { validateObjectId } from '../student/student.utils';
import { userRoles } from './users.constants';

export const createUserZodSchema = z.object({
  id: z.string({
    required_error: 'Id is required',
    invalid_type_error: 'Id must be a string',
  }),
  role: z.enum(userRoles, {
    required_error: 'Blood Group is required',
    invalid_type_error: `Invalid role specified. Only ${userRoles.join(
      ' , '
    )} are allowed.`,
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
  student: z
    .string({
      required_error: 'Student is required',
      invalid_type_error: 'Student must be a string',
    })
    .refine(validateObjectId, {
      message: 'Invalid Student Id',
    })
    .optional(),
  admin: z
    .string({
      required_error: 'Admin is required',
      invalid_type_error: 'Admin must be a string',
    })
    .refine(validateObjectId, {
      message: 'Invalid Admin Id',
    })
    .optional(),
  faculty: z
    .string({
      required_error: 'Faculty is required',
      invalid_type_error: 'Faculty must be a string',
    })
    .refine(validateObjectId, {
      message: 'Invalid Faculty Id',
    })
    .optional(),
});
