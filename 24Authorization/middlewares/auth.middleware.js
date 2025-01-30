const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, "masai", async (err, decoded) => {
      if (decoded) {
        const { userId } = decoded;
        const userMakingReq = await UserModel.findOne({ _id: userId });
        const requiredRole = userMakingReq?.role;
        req.role = requiredRole;
        next();
      } else {
        res.json({ err });
      }
    });
  } else {
    res.json({ msg: "Please Login first" });
  }
};

module.exports = { auth };
