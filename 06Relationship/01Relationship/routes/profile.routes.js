const express = require("express");
const profileRouter = express.Router();
const { ProfileModel } = require("../models/profile.models");

profileRouter.get("/", async (req, res) => {
  try {
    const profiles = await ProfileModel.find();
    res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

profileRouter.post("/", async (req, res) => {
  try {
    const newProfile = new ProfileModel(req.body);
    await newProfile.save();
    res.status(201).send({ message: `Profile is created` }, newProfile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = { profileRouter };
