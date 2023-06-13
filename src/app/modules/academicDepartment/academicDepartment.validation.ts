import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    academicFaculty: z
      .string({
        required_error: "Academic Faculty is required",
      })
      .refine((val) => isValidObjectId(val), {
        message: "Invalid Academic Faculty ObjectId",
      }),
  }),
});

export const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: "Academic Faculty is required",
      })
      .refine((val) => isValidObjectId(val), {
        message: "Invalid Academic Faculty ObjectId",
      })
      .optional(),
  }),
});
