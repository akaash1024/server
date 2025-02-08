const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: (val) => val >= 18 && val <= 65,
        message: "Age should be between 18 to 65",
      },
    },
    location: { type: String, required: true }, 
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
