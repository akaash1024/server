const express = require("express");
const Order = require("../models/order.models");
const orderRouter = express.Router();


// Route to get all orders
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).populate("User_virtual").select("-createdAt -updatedAt");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new order
orderRouter.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: `Order is created`, order: newOrder },);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = orderRouter;
