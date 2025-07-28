

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        age: { type: Number, required: true, min: 18, max: 30 },
        location: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

profileSchema.virtual("virtual_profile_user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id"

})

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile;