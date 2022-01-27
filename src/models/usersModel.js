import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    hash: { type: String },
    accessGroups: { type: String },
  },

  {
    timestamps: true,
    versionKey: false,
    collection: "users",
  }
);

const UsersModel = mongoose.model("User", UserSchema);

export default UsersModel;
