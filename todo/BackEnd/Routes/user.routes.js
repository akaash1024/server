const userRoutes = require("express").Router();

const registerUser = require("../controllers/user/register.user");
const loginUser = require("../controllers/user/login.user");

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

module.exports = userRoutes;
