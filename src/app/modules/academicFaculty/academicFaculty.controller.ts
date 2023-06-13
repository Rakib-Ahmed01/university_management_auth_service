import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../utils/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { createAcademicFacultyService } from "./academicFaculty.services";

export const createAcademicFaculty = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const academicFaculty = await createAcademicFacultyService(payload);

    sendResponse<IAcademicFaculty>(res, {
      data: academicFaculty,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Faculty Created Successfully",
    });
  }
);
