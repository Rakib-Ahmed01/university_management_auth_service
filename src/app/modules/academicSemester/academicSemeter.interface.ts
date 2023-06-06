import { Model } from "mongoose";

export type IAcademicSemeter = {
  title: Title;
  year: number;
  code: Code;
  startMonth: Month;
  endMonth: Month;
};

export type AcademicSemeterModel = Model<IAcademicSemeter>;
export type Month =
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
export type Title = "autumn" | "summer" | "fall";
export type Code = "01" | "02" | "03";
