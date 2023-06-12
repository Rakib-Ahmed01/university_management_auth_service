import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
} from "./academicSemester.controller";
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from "./academicSemester.validation";

const academicSemesterRouter = express.Router();

academicSemesterRouter
  .route("/:semesterId")
  .get(getSemesterById)
  .patch(validateRequest(updateAcademicSemesterZodSchema), updateSemester);

academicSemesterRouter
  .route("/")
  .post(validateRequest(createAcademicSemesterZodSchema), createSemester)
  .get(getAllSemesters);

export default academicSemesterRouter;
