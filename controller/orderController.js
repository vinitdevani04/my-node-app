const OrderModel = require("../model/orderModel");

const createOrder = async (req, res) => {
    try {
        const { product, productName, price, storage, quantity, user, paymentType, transactionHash, walletId } = req.body;

        // Check if transactionHash is unique
        const existingOrder = await OrderModel.findOne({ transactionHash });
        if (existingOrder) {
            return res.status(400).json({ message: "Transaction hash must be unique", success: false });
        }

        const newOrder = new OrderModel({ product, productName, price, storage, quantity, user, paymentType, transactionHash, walletId });
        await newOrder.save();

        res.status(201).json({ message: "Order created successfully. Please wait for payment verification.", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await OrderModel.find().populate('user');
        res.status(200).json({ data: allOrders });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id).populate('user');
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ data: order });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "Order status updated successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "Order deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const changeOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "Order status changed successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, changeOrderStatus };