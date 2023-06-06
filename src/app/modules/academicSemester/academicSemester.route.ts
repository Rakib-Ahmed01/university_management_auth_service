import express from "express";
import { createAcademicSemester } from "./academicSemester.controller";

const academicSemesterRouter = express.Router();

academicSemesterRouter.route("/").post(createAcademicSemester);

export default academicSemesterRouter;
