import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import {
  createAcademicDepartment,
  deleteAcademicDepartment,
  getAcademicDepartmentById,
  getAllAcademicDepartment,
  updateAcademicDepartment,
} from "./academicDepartment.controller";
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from "./academicDepartment.validation";

export const academicDepartmentRouter = express.Router();

academicDepartmentRouter
  .route("/:departmentId")
  .get(getAcademicDepartmentById)
  .patch(
    validateRequest(updateAcademicDepartmentZodSchema),
    updateAcademicDepartment
  )
  .delete(deleteAcademicDepartment);

academicDepartmentRouter
  .route("/")
  .get(getAllAcademicDepartment)
  .post(
    validateRequest(createAcademicDepartmentZodSchema),
    createAcademicDepartment
  );
