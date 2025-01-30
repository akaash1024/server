const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 18 && value <= 65,
        message: "Age should be between 18 and 65",
      },
    },
    location: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const ProfileModel = mongoose.model("profile", profileSchema);
module.exports = { ProfileModel };
