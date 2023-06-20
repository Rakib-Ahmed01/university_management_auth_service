import { z } from 'zod';
import { validateObjectId } from '../student/student.utils';
import { bloodGroups, genders, userRoles } from './users.constants';

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

export const userBaseZodSchema = z.object({
  name: z.object({
    firstName: z.string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name must be a string',
    }),
    middleName: z.string().optional(),
    lastName: z.string({
      required_error: 'Last Name is required',
      invalid_type_error: 'Last Name must be a string',
    }),
  }),
  gender: z.enum(genders, {
    required_error: 'Gender is required',
    invalid_type_error: `Invalid gender specified. Only ${genders.join(
      ' , '
    )} are allowed.`,
  }),
  dateOfBirth: z.string({
    required_error: 'Date of Birth is required',
    invalid_type_error: 'Date of Birth must be a string',
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }),
  contactNo: z.string({
    required_error: 'Contact Number is required',
    invalid_type_error: 'Contact Number must be a string',
  }),
  emergencyContactNo: z.string({
    required_error: 'Emergency Contact Number is required',
    invalid_type_error: 'Emergency Contact Number must be a string',
  }),
  presentAddress: z.string({
    required_error: 'Present Address is required',
    invalid_type_error: 'Present Address must be a string',
  }),
  permanentAddress: z.string({
    required_error: 'Permanent Address is required',
    invalid_type_error: 'Permanent Address must be a string',
  }),
  bloodGroup: z.enum(bloodGroups, {
    required_error: 'Blood Group is required',
    invalid_type_error: `Invalid blood group specified. Only ${bloodGroups.join(
      ', '
    )} are allowed.`,
  }),
});
