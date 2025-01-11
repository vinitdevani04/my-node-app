const mongoose = require("mongoose");

// Wallet Schema
const WalletSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    transaction: {
        transactionHash: { type: String, required: true, unique: true },
        walletAddress: { type: String, required: true },
        networkName: { type: String, required: true },
        coinName: { type: String, required: true },
        amount: { type: Number },
        verified: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now }
    }
});

module.exports = mongoose.model("Wallet", WalletSchema);
