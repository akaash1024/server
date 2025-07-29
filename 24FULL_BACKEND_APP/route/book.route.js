const bookController = require("../controller/book.controller")
const bookRoute = require("express").Router();


bookRoute.route("/").get(bookController.getAllBook);
bookRoute.route("/:id").get(bookController.getBookById);


module.exports = bookRoute;
