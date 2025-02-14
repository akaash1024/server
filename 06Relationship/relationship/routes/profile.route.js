const express = require("express");
const Profile = require("../models/profile.models");
const profileRouter = express.Router();

profileRouter.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("profile_virtual").select("-createdAt -updatedAt");
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

profileRouter.post("/", async (req, res) => {
  const { username, age, location, userId } = req.body
  try {
    const newProfile = await Profile.create({ username, age, location, userId });
    if (newProfile) {
      res.status(201).json({ message: `Profile is created`, profile: newProfile });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = profileRouter;
