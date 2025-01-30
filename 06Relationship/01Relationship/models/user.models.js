const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("profile", {
  ref: "profile",
  localField: "_id",
  foreignField: "userId",
  justOne: true
});



userSchema.virtual("orders", {
  ref: "orders",
  localField: "_id",
  foreignField: "userId"
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
