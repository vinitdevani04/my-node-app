const OrderModel = require("../model/orderModel");
const Wallet = require('../model/walletModel');

const createOrder = async (req, res) => {
    try {
        const {
            phone,
            email,
            products,
            paymentType,
            networkType,
            transactionHash,
            walletId,
            isWalletPayment,
            address,
            city,
            pincode
        } = req.body;

        // Validate required fields for wallet payment
        if (isWalletPayment) {
            if (!walletId || !address || !city || !pincode) {
                return res.status(400).json({ message: "Missing required fields for wallet payment." });
            }
        } else {
            // Validate required fields for other payment methods
            if (!paymentType || !networkType || !transactionHash || !walletId || !address || !city || !pincode) {
                return res.status(400).json({ message: "Missing required fields for non-wallet payment." });
            }

            // Check if transactionHash is unique across all collections
            const isTransactionHashExists = await checkTransactionHashExists(transactionHash);
            if (isTransactionHashExists) {
                return res.status(400).json({ message: "Transaction hash already exists." });
            }
        }

        // Create a new order
        const newOrder = new Order({
            phone,
            email,
            products,
            paymentType: isWalletPayment ? undefined : paymentType, // Exclude paymentType for wallet payment
            networkType: isWalletPayment ? undefined : networkType, // Exclude networkType for wallet payment
            transactionHash: isWalletPayment ? undefined : transactionHash, // Exclude transactionHash for wallet payment
            walletId,
            isWalletPayment: isWalletPayment || false, // Default to false if not provided
            address,
            city,
            pincode
        });

        // Save the order in the database
        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: "Order created successfully.",
            order: savedOrder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const checkTransactionHashExists = async (transactionHash) => {
    // Check in Orders collection
    const existingInOrders = await Order.findOne({ transactionHash });
    if (existingInOrders) {
        return true;
    }

    // Check in Wallet collection
    const existingInWallet = await Wallet.findOne({ transactionHash });
    if (existingInWallet) {
        return true;
    }
    
    return false;
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
