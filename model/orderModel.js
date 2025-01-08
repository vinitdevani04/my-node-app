const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
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
    }
});

const orderSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    products: [productSchema], // Array of products
    paymentType: {
        type: String,
        enum: ['BTC', 'SOLANA', 'ETH', 'USDT'],
        required: true
    },
    networkType: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        default: 'Pending'
    },
    verifiedPayment: {
        type: Boolean,
        default: false
    },
    transactionHash: {
        type: String,
        required: true,
        unique: true
    },
    walletId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    orderDateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orders', orderSchema);