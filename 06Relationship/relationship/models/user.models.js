const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("Virtual_Profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

userSchema.virtual("Virtual_Order", {
  ref: "Order",
  localField: "_id",
  foreignField: "userId",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
