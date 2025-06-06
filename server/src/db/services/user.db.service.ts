import { Schema } from "mongoose";
import { User } from "../schemas";
import { FindByIdAndUpdateUserType, RegisterUserType } from "../../types/db/services/types";
import { UserRoleType, UserSchemaType } from "../../types/db/schemas";

const createUser = async (data: RegisterUserType): Promise<UserSchemaType> => {
  return await User.create(data);
};

const deleteUserById = async (
  userId: Schema.Types.ObjectId
): Promise<UserSchemaType | null> => {
  return await User.findByIdAndDelete(userId);
};

const findUserByIdAndUpdate = async (
  data: FindByIdAndUpdateUserType
): Promise<UserSchemaType | null> => {
  return await User.findByIdAndUpdate(data.id, { ...data });
};

const getUserByIDorEmail = async ({
  data,
  type,
}: {
  data: string;
  type: "id" | "email";
}): Promise<UserSchemaType | null> => {
  let user;
  if (type === "id") user = await User.findById(data);
  else user = await User.findOne({ email: data });
  return user;
};

const getAllUsersDbService = async (role: UserRoleType): Promise<UserSchemaType[]> => {
  return await User.find({role: role});
};

export {
  createUser,
  deleteUserById,
  findUserByIdAndUpdate,
  getUserByIDorEmail,
  getAllUsersDbService
};
