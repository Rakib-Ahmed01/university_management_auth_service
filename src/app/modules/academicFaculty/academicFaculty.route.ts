import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { deleteSemester } from "../academicSemester/academicSemester.controller";
import {
  createAcademicFaculty,
  getAcademicFacultyById,
  getAllAcademicFaculty,
  updateAcademicFaculty,
} from "./academicFaculty.controller";
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from "./academicFaculty.validation";

export const academicFacultyRouter = express.Router();

academicFacultyRouter
  .route("/:facultyId")
  .get(getAcademicFacultyById)
  .patch(validateRequest(updateAcademicFacultyZodSchema), updateAcademicFaculty)
  .delete(deleteSemester);

academicFacultyRouter
  .route("/")
  .get(getAllAcademicFaculty)
  .post(validateRequest(createAcademicFacultyZodSchema), createAcademicFaculty);
