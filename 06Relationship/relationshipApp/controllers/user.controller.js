const User = require("../models/user.model")



const getUser = async (req, res) => {
    try {
        const users = await User.find({}).populate("virtual_Profile").populate("virtual_Order").select("-createdAt -updatedAt");
        res.status(200).json(users)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save()
        res.status(201).json({ message: `User created`, newUser })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { getUser, addUser }