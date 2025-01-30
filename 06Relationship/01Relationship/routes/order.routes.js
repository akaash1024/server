const express = require("express");
const orderRouter = express.Router();
const { OrderModel } = require("../models/order.models");

// Route to get all orders
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find(); // Fetch all orders from the database
    res.status(200).send(orders); // Send the orders as the response
  } catch (error) {
    res.status(500).send({ msg: error.message }); // Send error response
  }
});

// Route to create a new order
orderRouter.post("/", async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body); // Create a new instance of OrderModel with request data
    await newOrder.save(); // Save the new order to the database
    res.status(201).send({ msg: `Order is created` }, newOrder); // Send success response
  } catch (error) {
    res.status(500).send({ msg: error.message }); // Send error response
  }
});

module.exports = { orderRouter };
