import { z } from 'zod';
import { bloodGroups, genders } from '../users/users.constants';
import { validateObjectId } from './student.utils';

export const createStudentZodchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .optional(),
    student: z.object(
      {
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
            ' , '
          )} are allowed.`,
        }),
        guardian: z.object({
          fatherName: z.string({
            required_error: 'Father Name is required',
            invalid_type_error: 'Father Name must be a string',
          }),
          fatherOccupation: z.string({
            required_error: 'Father Occupation is required',
            invalid_type_error: 'Father Occupation must be a string',
          }),
          fatherContactNo: z.string({
            required_error: 'Father Contact Number is required',
            invalid_type_error: 'Father Contact Number must be a string',
          }),
          motherName: z.string({
            required_error: 'Mother Name is required',
            invalid_type_error: 'Mother Name must be a string',
          }),
          motherOccupation: z.string({
            required_error: 'Mother Occupation is required',
            invalid_type_error: 'Mother Occupation must be a string',
          }),
          motherContactNo: z.string({
            required_error: 'Mother Contact Number is required',
            invalid_type_error: 'Mother Contact Number must be a string',
          }),
          address: z.string({
            required_error: 'Address is required',
            invalid_type_error: 'Address must be a string',
          }),
        }),
        localGuardian: z.object({
          name: z.string({
            required_error: 'Local Guardian Name is required',
            invalid_type_error: 'Local Guardian Name must be a string',
          }),
          occupation: z.string({
            required_error: 'Local Guardian Occupation is required',
            invalid_type_error: 'Local Guardian Occupation must be a string',
          }),
          contactNo: z.string({
            required_error: 'Local Guardian Contact Number is required',
            invalid_type_error:
              'Local Guardian Contact Number must be a string',
          }),
          address: z.string({
            required_error: 'Local Guardian Address is required',
            invalid_type_error: 'Local Guardian Address must be a string',
          }),
        }),
        academicSemester: z
          .string({
            required_error: 'Academic Semester is required',
            invalid_type_error: 'Academic Semester must be a string',
          })
          .refine(validateObjectId, {
            message: 'Invalid Academic Academic Semester Id',
          }),
        academicDepartment: z
          .string({
            required_error: 'Academic Department is required',
            invalid_type_error: 'Academic Department must be a string',
          })
          .refine(validateObjectId, {
            message: 'Invalid Academic Academic Department Id',
          }),
        academicFaculty: z
          .string({
            required_error: 'Academic Faculty is required',
            invalid_type_error: 'Academic Faculty must be a string',
          })
          .refine(validateObjectId, {
            message: 'Invalid Academic Academic Faculty Id',
          }),
      },
      {
        required_error: 'Please provide student data',
      }
    ),
  }),
});

export const updateStudentZodchema = createStudentZodchema.deepPartial();
