require("dotenv").config();
const jwt = require("jsonwebtoken");
const User_Database = require("../models/user.model");

const authMiddleware = async (req, res, next) => {  
  
  const token = req.headers["authorization"];
  
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided" });
    // ! need to test later process.exit(0)
  }

  const jwtToken = token.split(" ")[1]; // Extract token properly
  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized. Token format is incorrect." });
  }

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // ! need to test this
    // ! const userData = await User_Database.findOne({ email: isVerified.email }, {isVerified.password:0})

    // ! in case want certain field
    // ! not comma, ("name age contact etc..")
    // !const userData = await User_Database.findOne({ email: isVerified.email }).select("name age"); 


    const userData = await User_Database.findOne({ email: isVerified.email }).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    console.log(req.user,req.token,req.userID, );
    

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authMiddleware;
