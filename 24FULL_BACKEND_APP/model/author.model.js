
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        biography: { type: String, required: true },
        dateOfBirth: { type: String, required: true, },
        nationality: { type: String, required: true },
        writtenBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]

    },
    {
        timestamps: false,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

authorSchema.virtual("writtenBooks", {
    ref: "Book",
    localField: "_id",
    foreignField: "author"
})

const Author = mongoose.model("Author", authorSchema)

module.exports = Author;