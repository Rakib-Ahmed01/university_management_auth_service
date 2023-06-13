import express, { Router } from "express";
import { academicFacultyRouter } from "../app/modules/academicFaculty/academicFaculty.route";
import academicSemesterRouter from "../app/modules/academicSemester/academicSemester.route";
import userRouter from "../app/modules/users/users.route";

export const router = express.Router();

type Route = {
  path: `/api/v1/${string}`;
  router: Router;
};

const routes: Route[] = [
  {
    path: "/api/v1/users",
    router: userRouter,
  },
  {
    path: "/api/v1/semesters",
    router: academicSemesterRouter,
  },
  {
    path: "/api/v1/academic-faculties",
    router: academicFacultyRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));
