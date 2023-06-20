import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  createStudent,
  getAllStudents,
  getStudentById,
} from './student.controller';
import { createStudentZodchema } from './student.validation';

export const studentRouter = express.Router();

studentRouter.route('/:studentId').get(getStudentById).patch().delete();

studentRouter
  .route('/')
  .get(getAllStudents)
  .post(validateRequest(createStudentZodchema), createStudent);
