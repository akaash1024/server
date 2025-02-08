const express = require("express");
const Profile = require("../models/profile.models");
const profileRouter = express.Router();

profileRouter.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

profileRouter.post("/", async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.status(201).send({ msg: `Profile is created` }, newProfile);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = profileRouter;
