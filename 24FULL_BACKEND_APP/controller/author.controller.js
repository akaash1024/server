// * 
// - User Side
// * 

const Author = require("../model/author.model")

async function getAllAuthors(req, res, next) {
    try {
        const author = await Author.find({})
        res.status(200).json({ success: true, message: "Author fetched successfully", author })
    } catch (error) {
        next(error)
    }
}

async function getAllAuthorById(req, res, next) {
    const { id } = req.params;
    try {
        const author = await Author.findById({ _id: id })
        if (author) {
            res.status(200).json({ success: true, message: "Author fetched successfully ", author })
        }
    } catch (error) {
        next(error)
    }
}

// * 
// - Admin Side
// * 


module.exports = { getAllAuthorById, getAllAuthors }