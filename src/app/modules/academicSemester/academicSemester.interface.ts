import { Model } from "mongoose";

export type IAcademicSemester = {
  title: SemesterTitle;
  year: string;
  code: SemesterCode;
  startMonth: SemesterMonth;
  endMonth: SemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
export type SemesterMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type SemesterTitle = "autumn" | "summer" | "fall";
export type SemesterCode = "01" | "02" | "03";
