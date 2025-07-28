const orderController = require("../controllers/order.controller")

const express = require("express")

const orderRouter = express.Router();

orderRouter.route("/").get(orderController.getOrder)
orderRouter.route("/order-placed").post(orderController.placeOrder)

module.exports = orderRouter