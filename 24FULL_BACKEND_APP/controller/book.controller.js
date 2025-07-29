const Book = require("../model/book.model")



async function getAllBook(req, res, next) {
    try {
        const books = await Book.find({}).populate("authorDetails").populate("borrowersDetails")
        res.status(200).json({ success: true, message: "Book Fetched Successfully", books })
    } catch (error) {
        next(error)
    }
}
const getBookById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const book = await Book.findById({ _id: id, }).populate("authorDetails").populate("borrowersDetails")
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.status(200).json({ success: true, message: "Book fetched Successfully", book })
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllBook, getBookById }