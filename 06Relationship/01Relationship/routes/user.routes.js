const express = require("express");
const { UserModel } = require("../models/user.models");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate("profile").populate("orders");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send({ message: `User created` }, newUser); // Send success response
  } catch (error) {
    res.status(500).send({ message: error.message }); // Handle errors
  }
});

module.exports = { userRouter };
