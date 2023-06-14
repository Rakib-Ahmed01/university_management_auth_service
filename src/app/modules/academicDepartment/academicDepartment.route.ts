import express from "express";
import {
  createAcademicDepartment,
  getAllAcademicDepartment,
} from "./academicDepartment.controller";

export const academicDepartmentRouter = express.Router();

academicDepartmentRouter.route("/:departmentId");

academicDepartmentRouter
  .route("/")
  .post(createAcademicDepartment)
  .get(getAllAcademicDepartment);
