const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ["admin", "member"], default: "member" },
        isAdmin: { type: Boolean, default: false },
        avatar: { type: String, required: true },
        borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" },],
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)




userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next()
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRound)
        user.password = hashedPassword
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function (password) {
    console.log(this.password);

    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
        )
    } catch (error) {
        console.error(error)
    }
}

const User = mongoose.model("User", userSchema)
module.exports = User;