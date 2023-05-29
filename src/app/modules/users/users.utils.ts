import User from "./users.model";

const getLastUserId = async () => {
  const lastUser = await User.find({}, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();
  return lastUser[0]?.id;
};

export const generateUserId = async () => {
  const lastUserId = await getLastUserId();
  const nextId = Number(lastUserId) + 1 || 1;
  return nextId.toString().padStart(5, "0");
};
