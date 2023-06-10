import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import {
  createAcademicSemester,
  getAllSemesters,
} from "./academicSemester.controller";
import { createAcademicSemesterZodSchema } from "./academicSemester.validation";

const academicSemesterRouter = express.Router();

academicSemesterRouter
  .route("/")
  .post(
    validateRequest(createAcademicSemesterZodSchema),
    createAcademicSemester
  )
  .get(getAllSemesters);

export default academicSemesterRouter;
