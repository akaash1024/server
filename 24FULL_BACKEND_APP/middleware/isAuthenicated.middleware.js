const jwt = require("jsonwebtoken");
const User = require("../model/auth.model");


const isAuthenicated = async (req, res, next) => {
    //! const token = req.headers["authorization"]; // making changes here
    const token = req.cookies.token; // ✅ from cookie, not header

    if (!token) return res.status(401).json({ message: "Unauthorised. Token not provided." })

    // const jwtToken = token.split(" ")[1];
    const jwtToken = token;

    if (!jwtToken) return res.status(401).json({ message: "Unauthorised. Token format is incorrect." })

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

        const userData = await User.findOne({ email: isVerified.email }).select("-password");

        if (!userData) return res.status(404).json({ message: "User not found" })

        req.user = userData;
        req.token = token;
        req.userId = userData._id // TODO if you come here for any error purpose, then start from this line i am taking "usserID"

        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = isAuthenicated;