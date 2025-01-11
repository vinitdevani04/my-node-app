const Wallet = require("../model/walletModel");

// Add a transaction
const addTransaction = async (req, res) => {
    try {
        const { email, transactionHash, walletAddress, networkName, coinName, amount } = req.body;

        if (!email || !transactionHash || !walletAddress || !networkName || !coinName) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const existingTransaction = await Wallet.findOne({ "transaction.transactionHash": transactionHash });
        if (existingTransaction) {
            return res.status(400).json({ message: "Transaction hash already exists", success: false });
        }
        const newWallet = new Wallet({
            email,
            transactionHash,
            walletAddress,
            networkName,
            coinName,
            amount,
            verified: false

        });

        await newWallet.save();

        res.status(201).json({ message: "Transaction created successfully", success: true, data: newWallet });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


const verifyTransaction = async (req, res) => {
    try {
        const { transactionHash, newAmount } = req.body;

        // Validate input
        if (!transactionHash || newAmount === undefined) {
            return res.status(400).json({ message: "Transaction hash and new amount are required", success: false });
        }

        // Find the wallet with the specific transaction hash
        const wallet = await Wallet.findOne({ "transaction.transactionHash": transactionHash });
        if (!wallet) {
            return res.status(404).json({ message: "Transaction not found", success: false });
        }

        // Update the transaction
        wallet.transaction.verified = true;
        wallet.transaction.amount = newAmount;

        await wallet.save();

        res.status(200).json({ message: "Transaction verified successfully", success: true, data: wallet });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


// Get all transactions for a user
const getUserTransactions = async (req, res) => {
    try {
        const { email } = req.body;

        const wallet = await Wallet.find({ email });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found", success: false });
        }

        res.status(200).json({ wallet });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Get all users and their transactions
const getAllTransactions = async (req, res) => {
    try {
        const wallets = await Wallet.find({});

        if (!wallets.length) {
            return res.status(404).json({ message: "No wallets found", success: false });
        }

        res.status(200).json({ message: "All user transactions retrieved", success: true, data: wallets });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { addTransaction, verifyTransaction, getUserTransactions, getAllTransactions };
