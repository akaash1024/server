const User = require("../models/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const registerUser = async (req, res) => {
    try {
        const { name, age } = req.body;

        const avatarLocalPath = req.file?.path; // Change from req.files to req.file
        console.log(avatarLocalPath);

        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar file is required" });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        const user = await User.create({
            name,
            age,
            avatar: avatar.url,
        });

        const createdUser = await User.findById(user._id);

        return res.status(201).json({ message: "User registered successfully", createdUser });

    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = registerUser;