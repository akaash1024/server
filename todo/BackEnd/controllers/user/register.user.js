const UserModel = require("../../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(203).json({ msg: "User already registered.. ." });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ msg: `User registered successfully`, newUser });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = registerUser;
