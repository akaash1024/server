const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/, // ! need to check while revision
    },
    password: { // ! need to check this field too,
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) => value.length >= 8,
        message: "Password must be 8 character",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
