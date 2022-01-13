import bcrypt from "bcrypt";
import express from "express";
import * as usersController from "../controllers/usersController.js";

const saltRounds = 8;
// const myPlaintextPassword = "password";

// mongoose.connect("mongodb://localhost:27017/test");
const usersRouter = express.Router();



const userIsInGroup = (user, accessGroup) => {
  const accessGroupArray = user.accessGroups.split(",").map((m) => m.trim());
  return accessGroupArray.includes(accessGroup);
};

// UPDATE
// usersRouter.patch("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   const updateFields = req.body;
//   const result = await usersController.updateUser(id, updateFields);
//   res.json({
//     result,
//   });
// });

// CREATE
// usersRouter.post("/create", async (req, res) => {
//   const userObj = req.body;
//   console.log(userObj);
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
//         const user = await usersController.createUser(dbUser);
//         res.json({
//           user,
//         });
//       });
//     });
//   }
// });



usersRouter.post("/signup", async (req, res) => {
  const frontendUser = req.body;
  console.log(frontendUser);
  if (
    frontendUser.username.trim() === "" ||
    frontendUser.password1.trim() === "" ||
    frontendUser.password1 !== frontendUser.password2
  ) {
    // res.sendStatus(403);
    res.status(500).send({ error: "the two passwords are different" });
  } else {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(frontendUser.password1, salt);
    const backendUser = {
      username: frontendUser.username,
      email: frontendUser.email,
      hash,
      accessGroups: "loggedInUsers",
    };
    const dbuser = await usersController.createUser(backendUser);
    res.json({
      userAdded: dbuser,
    });
  }
});

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

usersRouter.post("/login", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username);
  let user = await usersController.loginUser({ username });
  if (!user) {
    user = await usersController.loginUser({
      username: "anonymousUser",
    });
  } else {
    bcrypt.compare(password, user.hash).then((passwordIsOk) => {
      if (passwordIsOk) {
        req.session.user = user;
        req.session.save();
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    });
  }
});

// LOGOUT
usersRouter.get("/logout", async (req, res) => {
  req.session.destroy();
  const user = await usersController.logoutUser({ login: "anonymousUser" });
  res.json(user);
});

// CURRENT USER
usersRouter.get("/currentuser", async (req, res) => {
  let user = req.session.user;
  // console.log(req.session.user);
  if (!user) {
    user = await usersController.currentUser({ login: "anonymousUser" });
  }
  res.json(user);
});

// READ ALL
usersRouter.get("/", async (_req, res) => {
  const users = await usersController.readAllUsers();
  res.json(users);
});

// READ ONE
// usersRouter.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   // console.log(req.params.id);
//   res.json({
//     user: await usersController.readOneUser(id),
//   });
// });

// UPDATE
usersRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const updateFields = req.body;
  console.log(req.body);
  const result = await usersController.updateUser(id, updateFields);
  res.json({
    result,
  });
});

// DELETE
usersRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await usersController.deleteUser(id);
  res.json({
    result,
  });
});

usersRouter.delete("/deleteuser/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  let user = req.session.user;
  console.log(user)
  if (!userIsInGroup(user, "admins")) {
    res.sendStatus(403);
  } else {
    const user = await usersController.deleteUserbyAdmins(id);
    res.json( user );
  }
});

export { usersRouter };
