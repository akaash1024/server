const express = require("express")
const profileController = require("../controllers/profile.controller")
const profileRouter = express.Router()

profileRouter.route("/").get(profileController.getProfiles)
profileRouter.route("/add-profile").post(profileController.addProfile)

module.exports = profileRouter