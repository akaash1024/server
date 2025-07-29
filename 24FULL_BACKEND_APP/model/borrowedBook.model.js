const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema(
    {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", index: true },
        member: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
        borrowDate: { type: Date, default: () => new Date() },
        dueDate: {
            type: Date,
            default: function () {
                const today = new Date();
                const daysToAdd = parseInt(process.env.DUE_DATE) || 14;
                today.setDate(today.getDate() + daysToAdd);
                return today;
            }
        },
        returnDate: { type: Date },
        status: { type: String, enum: ["borrowed", "returned"], default: "borrowed", index: true },

    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true }
    }

);

borrowedBookSchema.virtual("bookDetails", {
    ref: "Book",
    localField: "book",
    foreignField: "_id",
    justOne: true
})

borrowedBookSchema.virtual("userDetails", {
    ref: "User",
    localField: "user",
    foreignField: "_id",
    justOne: true
})



const BorrowedBook = mongoose.model("BorrowedBook", borrowedBookSchema);
module.exports = BorrowedBook;