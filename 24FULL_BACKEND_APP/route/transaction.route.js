const transactionRoute = require("express").Router();




transactionRoute.route("/").post(transactionController.borrow_a_Book)
transactionRoute.route("/").post(transactionController.return_a_Book)


module.exports = transactionRoute;