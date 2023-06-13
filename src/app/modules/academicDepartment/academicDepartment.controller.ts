import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../utils/sendResponse";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { createAcademicDepartmentService } from "./academicDepartment.services";

export const createAcademicDepartment = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const academicDepartment = await createAcademicDepartmentService(payload);

    sendResponse<IAcademicDepartment>(res, {
      data: academicDepartment,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Department Created Successfully",
    });
  }
);
