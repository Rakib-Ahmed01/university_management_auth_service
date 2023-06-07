import express, { Router } from "express";
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
];

routes.forEach((route) => router.use(route.path, route.router));
