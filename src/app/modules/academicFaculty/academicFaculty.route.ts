import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createAcademicFaculty } from "./academicFaculty.controller";
import { createAcademicFacultyZodSchema } from "./academicFaculty.validation";

export const academicFacultyRouter = express.Router();

academicFacultyRouter
  .route("/")
  .get()
  .post(validateRequest(createAcademicFacultyZodSchema), createAcademicFaculty);
