const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        ISBN: { type: String, required: true, unique: true },
        summary: { type: String },
        publicationDate: { type: String, required: true },
        genres: [{ type: String }],
        copiesAvailable: { type: Number, default: 5 },
        borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }
    },
    {
        timestamps: false,
        versionKey: false,
        toJSON: { virtuals: true }
    }
);

bookSchema.virtual("authorDetails", {
    ref: "Author",
    localField: "author",
    foreignField: "_id",
    justOne: true
})

bookSchema.virtual("borrowersDetails", {
    ref: "User",
    localField: "borrowedBy",
    foreignField: "_id"
})


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;