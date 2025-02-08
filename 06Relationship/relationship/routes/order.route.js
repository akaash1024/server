const express = require("express");
const Order = require("../models/order.models");
const orderRouter = express.Router();


// Route to get all orders
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).send(orders); // Send the orders as the response
  } catch (error) {
    res.status(500).send({ msg: error.message }); // Send error response
  }
});

// Route to create a new order
orderRouter.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body); // Create a new instance of OrderModel with request data
    await newOrder.save(); // Save the new order to the database
    res.status(201).send({ msg: `Order is created` }, newOrder); // Send success response
  } catch (error) {
    res.status(500).send({ msg: error.message }); // Send error response
  }
});

module.exports =  orderRouter ;
