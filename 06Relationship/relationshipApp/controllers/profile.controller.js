const Profile = require("../models/profile.model")


const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({}).populate("virtual_profile_user");
        res.status(200).json(profiles)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const addProfile = async (req, res) => {
    const { username, age, location, userId } = req.body;
    try {
        const newProfile = await Profile.create({ username, age, location, userId })
        if (newProfile) {
            res.status(201).json({ message: `Profile is created`, profile: newProfile })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {getProfiles, addProfile}