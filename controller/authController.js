const AddModel = require("../model/userModel");

const register = async (req, res) => {
    try {
        const { email, password, contact } = req.body;

        const existingUser = await AddModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const newUser = new AddModel({ email, password, contact, totalWalletAmount: 0 });
        await newUser.save();
        console.log('User registered successfully' + newUser);
        res.status(200).json({ message: "User registered successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AddModel.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        res.status(200).json({ message: "Login successful", data: user, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllUser = async (req, res) => {
    try {
        const allUsers = await AddModel.find();
        res.status(200).json({ data: allUsers });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;

        const user = await AddModel.findOneAndDelete({ _id });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
const walletDeposit = async (req, res) => {
    try {
        const { email, transactionHash, walletAddress, networkName, coinName, amount } = req.body;

        const user = await AddModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Add the transaction to the user's transactions array with verified as false
        const transaction = {
            transactionHash,
            walletAddress,
            networkName,
            coinName,
            amount,
            verified: false
        };
        user.transactions.push(transaction);

        await user.save();

        res.status(200).json({ message: "Deposit recorded successfully, awaiting verification", success: true, data: user });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const verifyDeposit = async (req, res) => {
    try {
        const { email, transactionHash, confirmedAmount } = req.body;

        const user = await AddModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const transaction = user.transactions.find(tx => tx.transactionHash === transactionHash);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found", success: false });
        }

        if (transaction.verified) {
            return res.status(400).json({ message: "Transaction already verified", success: false });
        }

        transaction.verified = true;
        transaction.amount = confirmedAmount;
        user.totalWalletAmount += confirmedAmount;

        await user.save();

        res.status(200).json({ message: "Deposit verified and updated successfully", success: true, data: user });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getTransactions = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await AddModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "Transactions retrieved", success: true, transactions: user.transactions });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { register, login, getAllUser, deleteUser, getTransactions, walletDeposit, verifyDeposit };
