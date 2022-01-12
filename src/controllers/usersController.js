import UsersModel from "../models/usersModel.js";

export const createUser = async (frontendUser) => {
  return await UsersModel.create(frontendUser);
};

export const readAllUsers = async () => {
  return await UsersModel.find({});
};

// export const readOneUser = async (id) => {
//   return await UsersModel.find(id);
// };

export const loginUser = async (username) => {
  const userArray = await UsersModel.find(username);
  return userArray.length === 0 ? null : userArray[0];
};

export const logoutUser = async (login) => {
  return await UsersModel.findOne({ login });
};

// export const updateUser = async (id, updateFields) => {
//   return await UsersModel.findByIdAndUpdate(id, updateFields, {
//     new: true,
//   });
// };

export const deleteUser = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
};
