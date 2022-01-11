import bcrypt from "bcrypt";
import express from "express";
// import mongoose from "mongoose";
import * as usersController from "../controllers/usersController.js";

const saltRounds = 8;
const myPlaintextPassword = "password";

// mongoose.connect("mongodb://localhost:27017/test");
const usersRouter = express.Router();

// CREATE
// usersRouter.post("/create", async (req, res) => {
//   const userObj = req.body;
//   if (userObj.password1 !== userObj.password2) {
//     res.status(500).send({ error: "the two passwords are diffent" });
//   } else {
//     bcrypt.genSalt(saltRounds, function (err, salt) {
//       bcrypt.hash(myPlaintextPassword, salt, async (err, hash) => {
//         const dbUser = {
//           userName: userObj.userName,
//           hash,
//           email: userObj.email,
//         };
//         const result = await usersController.createUser(dbUser);
//         res.json({
//           result,
//         });
//       });
//     });
//   }
// });

// // LOGIN
// usersRouter.post("/login", async (req, res) => {
//   const userName = req.body.userName;
//   const password = req.body.password;
//   const user = await usersController.readOneUserWithUserName(userName);
//   console.log(user);
//   if (user) {
//     req.session.user = user;
//     req.session.save();
//     res.send(`User logged in: ${JSON.stringify(user)}`);
//   } else {
//     res.status(500).send("bad login");
//   }
// });

// READ ALL
usersRouter.get("/", async (_req, res) => {
  const users = await usersController.readAllUsers();
  res.json(users);
});
// READ ONE
// usersRouter.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   res.json({
//     users: await usersController.readOneUser(id),
//   });
// });
// UPDATE
// usersRouter.patch("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   const updateFields = req.body;
//   const result = await usersController.updateUser(id, updateFields);
//   res.json({
//     result,
//   });
// });
// // DELETE
// usersRouter.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   const result = await usersController.deleteUser(id);
//   res.json({
//     result,
//   });
// });
export { usersRouter };
