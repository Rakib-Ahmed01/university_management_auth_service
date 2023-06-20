import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from './student.controller';
import {
  createStudentZodchema,
  updateStudentZodchema,
} from './student.validation';

export const studentRouter = express.Router();

studentRouter
  .route('/:studentId')
  .get(getStudentById)
  .patch(validateRequest(updateStudentZodchema), updateStudent)
  .delete(deleteStudent);

studentRouter
  .route('/')
  .get(getAllStudents)
  .post(validateRequest(createStudentZodchema), createStudent);
