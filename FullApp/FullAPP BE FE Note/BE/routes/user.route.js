const User = require("../models/user.model");
const userController = require("../controller/user.controller");

const userRoute = require("express").Router();

userRoute.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes");
  res.send(users);
});

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

module.exports = userRoute;
