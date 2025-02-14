// * ----------------
// ? Auth - Controllers

const User_Database = require("../models/user.model");
const ApiResponse = require("../utils/ApiResponse");

// * ----------------
const home = (req, res, next) => {
  try {

    //! this is customized error need to check, service and contact controleler
    // * then understand the diff whole home code with 

    // ! contact and service conroller throw error part how we can crete customized error

    // ? throw {
    // ?   errors: [{ message: "Invalid input format Akash" }],
    // ? };

    // ? throw {
    // ?   message: "Hello this sis akash eror"
    // ? }

    // res.status(200).send(new ApiResponse(200, "Akash  successfully done"));
  } catch (err) {
    console.log(err);

    const status = 422;
    const message = "Fill the input properly";
    // const extraDetails = err.errors[0].message;
    const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails,
    };

    console.log(error);
    // res.status(400).json({ msg: message });
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    const isUserExit = await User_Database.findOne({ email });

    if (isUserExit) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered." });
    }

    const newUser = await User_Database.create({
      username,
      password,
      email,
      phone,
    });

    const newUserDetails = {
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    };

    return res.status(201).json({
      success: true,
      message: "Successfully Created",
      newUserDetails, // ✅ Ensure this is present
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;
    const isUserExist = await User_Database.findOne({ email });

    if (!isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordValid = await isUserExist.comparePassword(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const userDetails = {
      token: await isUserExist.generateToken(),
      userId: isUserExist._id.toString(),
    };

    return res.status(200).json({
      success: true,
      message: "Login Successful backend",
      data: userDetails, // ✅ Ensure 'data' contains token
    });
  } catch (error) {
    next(error);
  }
};

const user = async (req, res, next) => {
  try {
    const userData = req.user;
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// ! exporting
module.exports = { home, register, login, user };
