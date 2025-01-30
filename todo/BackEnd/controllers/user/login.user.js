const UserModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isFound = await bcrypt.compare(password, user.password);
    if (!isFound) return res.status(404).json({ msg: "Invalid Credentials" });

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      "upasanaBa"
    );

    res.status(200).json({ msg: "User login successfully", token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = loginUser;
