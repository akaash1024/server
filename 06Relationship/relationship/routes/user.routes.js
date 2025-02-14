const userRouter = require("express").Router();
const userController = require("../conrollers/user.controller");

/*
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate("profile").populate("orders");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
*/


userRouter.route("/").get(userController.getUser);
userRouter.route("/").post(userController.addUser);


module.exports = userRouter 