const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    transactionHash: {
        type: String,
        required: true
    },
    walletId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);