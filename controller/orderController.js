const OrderModel = require("../model/orderModel");

const createOrder = async (req, res) => {
    try {
        const { phone, email, products, paymentType, networkType, transactionHash, walletId, address, city, pincode } = req.body;

        // Ensure products is an array
        const productsArray = Array.isArray(products) ? products : [products];

        // Check for duplicate transaction hash
        const existingOrder = await OrderModel.findOne({ transactionHash });
        if (existingOrder) {
            return res.status(400).json({ message: "Transaction hash must be unique", success: false });
        }

        // Create a new order
        const newOrder = new OrderModel({
            phone,
            email,
            products: productsArray,
            paymentType,
            networkType,
            transactionHash,
            walletId,
            address,
            city,
            pincode,
            orderDateTime: new Date()
        });

        await newOrder.save();

        // Fetch all orders for the user
        const Orders = await OrderModel.find({ email, phone });

        res.status(201).json({
            message: "Order created successfully. Please wait for payment verification.",
            details: Orders,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await OrderModel.find();
        res.status(200).json({ data: allOrders });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }

        res.status(200).json({ data: order });
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
        const { orderStatus } = req.body;
        const order = await OrderModel.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "Order status changed successfully", success: true, data: order });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const updateVerifiedPaymentStatus = async (req, res) => {
    try {
        const { verifiedPayment } = req.body;
        const order = await OrderModel.findByIdAndUpdate(req.params.id, { verifiedPayment }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "Verified payment status updated successfully", success: true, data: order });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getOrdersByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        console.log("Query params:>>>>>", email);

        const orders = await OrderModel.find({ email });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders by email and phone:", error);
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, deleteOrder, changeOrderStatus, getOrdersByEmail, updateVerifiedPaymentStatus };
