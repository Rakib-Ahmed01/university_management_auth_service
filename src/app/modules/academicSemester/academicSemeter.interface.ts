import { Model } from "mongoose";

export type IAcademicSemeter = {
  title: SemesterTitle;
  year: number;
  code: SemesterCode;
  startMonth: SemesterMonth;
  endMonth: SemesterMonth;
};

export type AcademicSemeterModel = Model<IAcademicSemeter>;
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
