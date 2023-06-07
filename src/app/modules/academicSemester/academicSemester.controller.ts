import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { createAcademicSemesterService } from "./academicSemester.services";

export const createAcademicSemester = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const semester = req.body;
    const createdSemester = await createAcademicSemesterService(semester);
    res.status(200).json({ data: createdSemester, success: true });
  }
);
