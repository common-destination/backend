import UsersModel from "../models/usersModel.js";

export const createUser = async (frontendUser) => {
  return await UsersModel.create(frontendUser);
};

export const readAllUsers = async () => {
  return await UsersModel.find({});
};

export const readOneUser = async (id) => {
  return await UsersModel.findById(id);
};

export const loginUser = async (username) => {
  const userArray = await UsersModel.find(username);
  return userArray.length === 0 ? null : userArray[0];
};

export const logoutUser = async (login) => {
  return await UsersModel.findOne(login);
};

export const currentUser = async (login) => {
  return await UsersModel.findOne(login);
};

export const userByUsername = async (username) => {
  return await UsersModel.findOne({ username: username });
};

export const readOneUserWithUsername = async (username) => {
  return await UsersModel.find({ username });
 ;
};

// export const updateUser = async (id, updateFields) => {
//   return await UsersModel.findByIdAndUpdate(id, updateFields, {
//     new: true,
//   });
// };

export const updateUser = async (id, updateUser) => {
  return await UsersModel.findByIdAndUpdate(id, updateUser, {
    new: true,
  });
};
export const deleteUser = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
};

export const deleteUserbyAdmins = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
};
