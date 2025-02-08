const User = require("../models/user.model");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUserExit = await User.findOne({ email });

    if (isUserExit)
      return res.status(400).json({ message: "email already exists" });

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      msg: "Registration successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error("Regisration Failed", error.message);
  }
};


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid Credentials " });
      }
  
      // const user = await bcrypt.compare(password, userExist.password);
      const user = await userExist.comparePassword(password);
  
      if (user) {
        res.status(200).json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  };

module.exports = { register, login };
