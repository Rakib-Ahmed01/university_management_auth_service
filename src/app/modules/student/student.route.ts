import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createStudent } from './student.controller';
import { createStudentZodchema } from './student.validation';

export const studentRouter = express.Router();

studentRouter.route(':/studentId').get().patch().delete();

studentRouter
  .route('/')
  .get()
  .post(validateRequest(createStudentZodchema), createStudent);
