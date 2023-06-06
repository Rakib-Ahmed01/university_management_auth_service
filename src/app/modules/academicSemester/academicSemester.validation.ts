import { z } from "zod";
import { months } from "./academicSemeter.constants";

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(["autumn", "summmer", "fall"], {
      required_error: "title is required",
      invalid_type_error: "title must be - autumn, summer or fall",
    }),
    year: z.number({ required_error: "year is required" }),
    code: z.enum(["01", "02", "03"], {
      required_error: "code is required",
      invalid_type_error: `title must be - '01', '02', '03'`,
    }),
    startMonth: z.enum(months, {
      required_error: "start month is required",
      invalid_type_error: `start month must be - ${months.join(", ")}`,
    }),
    endMonth: z.enum(months, {
      required_error: "end month is required",
      invalid_type_error: `end month must be - ${months.join(", ")}`,
    }),
  }),
});
