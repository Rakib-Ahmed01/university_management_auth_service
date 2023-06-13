import { z } from "zod";

export const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .refine((val) => /^Faculty of [A-Za-z\s&]+$/.test(val), {
        message:
          "Invalid faculty name. Facult name must be started with Faculty of ...",
      }),
  }),
});

export const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .refine((val) => /^Faculty of [A-Za-z\s&]+$/.test(val), {
        message:
          "Invalid faculty name. Facult name must be started with Faculty of ...",
      }),
  }),
});
