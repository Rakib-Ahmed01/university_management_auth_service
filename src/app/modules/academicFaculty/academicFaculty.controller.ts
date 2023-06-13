import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { paginationFields } from "../../../constants/pagination";
import ApiError from "../../../errors/ApiError";
import { AcademicFacultyFilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { pickOptions } from "../../../utils/pickOptions";
import { sendResponse } from "../../../utils/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";
import {
  createAcademicFacultyService,
  deleteAcademicFacultyService,
  getAllAcademicFacultyService,
  getFacultyByIdService,
  updateAcademicFacultyService,
} from "./academicFaculty.services";

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

export const getAllAcademicFaculty = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = pickOptions(
      req.query as Record<string, unknown>,
      paginationFields
    ) as PaginationOptions;

    const filterOptions = pickOptions(req.query as Record<string, unknown>, [
      "search",
      "title",
    ]) as AcademicFacultyFilterOptions;

    const result = await getAllAcademicFacultyService(
      paginationOptions,
      filterOptions
    );

    sendResponse<IAcademicFaculty[]>(res, {
      data: result.data,
      statusCode: StatusCodes.OK,
      success: true,
      meta: result.meta,
    });
  }
);

export const getAcademicFacultyById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const facultyId = req.params.facultyId;

    const faculty = await getFacultyByIdService(facultyId);

    if (!faculty) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Faculty not found");
    }

    sendResponse<IAcademicFaculty>(res, {
      data: faculty,
      success: true,
      statusCode: StatusCodes.OK,
    });
  }
);

export const updateAcademicFaculty = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const facultyId = req.params.facultyId;
    const payload = req.body;

    const academicFaculty = await updateAcademicFacultyService(
      facultyId,
      payload
    );

    sendResponse<IAcademicFaculty>(res, {
      data: academicFaculty,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Faculty Updated Successfully",
    });
  }
);

export const deleteAcademicFaculty = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const facultyId = req.params.facultyId;

    const result = await deleteAcademicFacultyService(facultyId);

    sendResponse(res, {
      data: result,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Faculty Deleted Successfully",
    });
  }
);
