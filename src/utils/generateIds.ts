import { IAcademicSemester } from "../app/modules/academicSemester/academicSemester.interface";
import User from "../app/modules/users/users.model";

const getLastUserId = async (role: string) => {
  const users = await User.find(
    {
      role,
    },
    { _id: 0, id: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();

  let id = users[0]?.id;
  id = id ? id?.slice(4) : "";
  return id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const lastUserId = await getLastUserId("student");
  const nextId = Number(lastUserId) + 1 || 1;
  const incrementedId = String(nextId).padStart(5, "0");
  return `${academicSemester.year.slice(2)}${
    academicSemester.code
  }${incrementedId}`;
};

export const generateFacultyId = async () => {
  const lastFacultyId = await getLastUserId("faculty");
  const nextFacultyId = Number(lastFacultyId) + 1 || 1;
  const id = String(nextFacultyId).padStart(5, "0");
  return `F${id}`;
};

export const generateAdminId = async () => {
  const lastAdminId = await getLastUserId("admin");
  const nextAdminId = Number(lastAdminId) + 1 || 1;
  const id = String(nextAdminId).padStart(5, "0");
  return `A${id}`;
};
