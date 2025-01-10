const mongoose = require("mongoose")

const AddSchem = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalWalletAmount: {
        type: Number,
        default: 0
    },
    transactions: [{
        transactionHash: String,
        walletAddress: String,
        networkName: String,
        coinName: String,
        amount: Number,
        verified: Boolean,
        timestamp: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Users', AddSchem)