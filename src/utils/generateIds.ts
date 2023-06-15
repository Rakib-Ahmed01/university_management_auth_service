import { IAcademicSemester } from "../app/modules/academicSemester/academicSemester.interface";
import User from "../app/modules/users/users.model";

const getLastStudentId = async () => {
  const lastUser = await User.find(
    {
      role: "student",
    },
    { _id: 0, id: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();
  return lastUser[0]?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const lastUserId = await getLastStudentId();
  const nextId = Number(lastUserId) + 1 || 1;
  const incrementedId = nextId.toString().padStart(5, "0");
  return `${academicSemester.year.slice(2)}${
    academicSemester.code
  }${incrementedId}`;
};
