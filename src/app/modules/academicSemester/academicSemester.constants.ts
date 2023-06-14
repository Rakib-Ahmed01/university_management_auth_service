// Arrays
export const academicSemesterMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const academicSemesterTitles = ["autumn", "summer", "fall"] as const;

export const academicSemesterCodes = ["01", "02", "03"] as const;

export const semesterTitleCodeMapper: Record<string, string> = {
  "01": "autumn",
  "02": "summer",
  "03": "fall",
};
