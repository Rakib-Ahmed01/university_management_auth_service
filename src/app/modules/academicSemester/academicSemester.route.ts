import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import {
  createSemester,
  deleteSemester,
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
  .patch(validateRequest(updateAcademicSemesterZodSchema), updateSemester)
  .delete(deleteSemester);

academicSemesterRouter
  .route("/")
  .post(validateRequest(createAcademicSemesterZodSchema), createSemester)
  .get(getAllSemesters);

export default academicSemesterRouter;
