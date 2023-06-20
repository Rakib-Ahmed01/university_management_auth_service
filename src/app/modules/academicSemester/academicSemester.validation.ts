import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constants';

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(academicSemesterTitles, {
      required_error: 'title is required',
      invalid_type_error: 'title must be - autumn, summer or fall',
    }),
    year: z.string({
      required_error: 'year is required',
      invalid_type_error: 'year must be a string',
    }),
    code: z.enum(academicSemesterCodes, {
      required_error: 'code is required',
      invalid_type_error: `title must be - '01', '02', '03'`,
    }),
    startMonth: z.enum(academicSemesterMonths, {
      required_error: 'start month is required',
      invalid_type_error: `start month must be - ${academicSemesterMonths.join(
        ', '
      )}`,
    }),
    endMonth: z.enum(academicSemesterMonths, {
      required_error: 'end month is required',
      invalid_type_error: `end month must be - ${academicSemesterMonths.join(
        ', '
      )}`,
    }),
  }),
});

export const updateAcademicSemesterZodSchema =
  createAcademicSemesterZodSchema.deepPartial();
