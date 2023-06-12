import { z } from "zod";
import { academicSemesterMonths } from "./academicSemeter.constants";

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(["autumn", "summer", "fall"], {
      required_error: "title is required",
      invalid_type_error: "title must be - autumn, summer or fall",
    }),
    year: z.string({
      required_error: "year is required",
      invalid_type_error: "year must be a string",
    }),
    code: z.enum(["01", "02", "03"], {
      required_error: "code is required",
      invalid_type_error: `title must be - '01', '02', '03'`,
    }),
    startMonth: z.enum(academicSemesterMonths, {
      required_error: "start month is required",
      invalid_type_error: `start month must be - ${academicSemesterMonths.join(
        ", "
      )}`,
    }),
    endMonth: z.enum(academicSemesterMonths, {
      required_error: "end month is required",
      invalid_type_error: `end month must be - ${academicSemesterMonths.join(
        ", "
      )}`,
    }),
  }),
});

export const updateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z
      .enum(["autumn", "summer", "fall"], {
        required_error: "title is required",
        invalid_type_error: "title must be - autumn, summer or fall",
      })
      .optional(),
    year: z
      .string({
        required_error: "year is required",
        invalid_type_error: "year must be a string",
      })
      .optional(),
    code: z
      .enum(["01", "02", "03"], {
        required_error: "code is required",
        invalid_type_error: `title must be - '01', '02', '03'`,
      })
      .optional(),
    startMonth: z
      .enum(academicSemesterMonths, {
        required_error: "start month is required",
        invalid_type_error: `start month must be - ${academicSemesterMonths.join(
          ", "
        )}`,
      })
      .optional(),
    endMonth: z
      .enum(academicSemesterMonths, {
        required_error: "end month is required",
        invalid_type_error: `end month must be - ${academicSemesterMonths.join(
          ", "
        )}`,
      })
      .optional(),
  }),
});
