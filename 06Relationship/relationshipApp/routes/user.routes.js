const userController = require("../controllers/user.controller")

const userRouter = require("express").Router();

userRouter.route("/").get(userController.getUser)
userRouter.route("/add-user").post(userController.addUser)


module.exports = userRouter;