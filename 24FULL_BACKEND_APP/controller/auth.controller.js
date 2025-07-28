const User = require("../model/auth.model")


const register = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body;
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }

        const newUser = await User.create({ username, email, phone, password });
        const token = await newUser.generateToken();

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            userId: newUser._id.toString(), // optional
        });

    } catch (error) {
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordValid = await isUserExist.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = await isUserExist.generateToken();

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            userId: isUserExist._id.toString(), // optional
        });

    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
}


const user = async (req, res, next) => {
    try {
        const userData = req.user;
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            data: userData,
        });

    } catch (error) {
        next(error)
    }
}

module.exports = { register, login, user, logout }