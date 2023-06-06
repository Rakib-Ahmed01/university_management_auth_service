import { z } from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum(["admin", "student", "faculty"], {
      required_error: "role is required",
      invalid_type_error: "role must be - admin | student | faculty",
    }),
  }),
});
