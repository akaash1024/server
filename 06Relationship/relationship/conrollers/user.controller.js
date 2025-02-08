const User = require("../models/user.models");

const getUser = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate("Virtual_Profile")
      .populate("Virtual_Order");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const addUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ msg: `User created` , newUser}); 
  } catch (error) {
    res.status(500).json({ msg: error.message }); 
  }
};

module.exports = { getUser, addUser };
