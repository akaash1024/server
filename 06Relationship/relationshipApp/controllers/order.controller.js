const Order = require("../models/order.model")


const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("virtual_order_user")
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const placeOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body)
        await newOrder.save()
        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { getOrder, placeOrder }