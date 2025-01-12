const OrderModel = require("../model/orderModel");
const WalletModel = require("../model/walletModel");

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

        if (isWalletPayment) {
            // Validate required fields for wallet payment
            if (!phone || !email || !products || !address || !city || !pincode) {
                return res.status(400).json({ message: "Missing required fields for wallet payment." });
            }
        } else {
            // Validate required fields for non-wallet payment
            if (!paymentType || !networkType || !transactionHash || !walletId || !address || !city || !pincode) {
                return res.status(400).json({ message: "Missing required fields for non-wallet payment." });
            }

            // Check for duplicate transactionHash
            console.log("Checking transactionHash:", transactionHash);
            const isTransactionHashExists = await checkTransactionHashExists(transactionHash);
            console.log("Transaction hash exists:", isTransactionHashExists);

            if (isTransactionHashExists) {
                return res.status(400).json({ message: "Transaction hash already exists in the database." });
            }
        }

        // Prepare order data
        const orderData = {
            phone,
            email,
            products,
            isWalletPayment: isWalletPayment || false,
            address,
            city,
            pincode,
            orderStatus: "Pending",
            verifiedPayment: false,
            orderDateTime: Date.now()
        };

        if (!isWalletPayment) {
            // Include payment-related fields only for non-wallet payments
            orderData.paymentType = paymentType;
            orderData.walletId = walletId;
            orderData.networkType = networkType;
            orderData.transactionHash = transactionHash;
        }

        console.log("Creating order with data:", orderData);
        const newOrder = new OrderModel(orderData);
        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: "Order created successfully.",
            order: savedOrder
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: error.message });
    }
};

const checkTransactionHashExists = async (transactionHash) => {
    try {


        // Check in Orders collection
        const existingInOrders = await OrderModel.findOne({ transactionHash });
        if (existingInOrders) {
            return true;
        }

        // Check in Wallet collection
        const existingInWallet = await WalletModel.findOne({ transactionHash });
        if (existingInWallet) {
            return true;
        }

        return false; // `transactionHash` is unique
    } catch (error) {
        throw new Error("Error while checking transaction hash: " + error.message);
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
