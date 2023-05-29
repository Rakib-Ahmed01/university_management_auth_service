export type IUser = {
  id: string;
  role: "admin" | "student" | "faculty";
  password: string;
};
