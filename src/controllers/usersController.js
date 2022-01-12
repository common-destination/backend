import UsersModel from "../models/usersModel.js";

// export const createUser = async (userObj) => {
//   return await UsersModel.create(userObj);
// };

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

// export const updateUser = async (id, updateFields) => {
//   return await UsersModel.findByIdAndUpdate(id, updateFields, {
//     new: true,
//   });
// };

export const deleteUser = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
};
