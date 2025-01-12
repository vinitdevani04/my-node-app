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
        required: function () {
            return !this.isWalletPayment; // Required only if wallet payment is false
        }
    },
    networkType: {
        type: String,
        required: function () {
            return !this.isWalletPayment; // Required only if wallet payment is false
        }
    },
    transactionHash: {
        type: String,
        required: function () {
            return !this.isWalletPayment; // Required only if wallet payment is false
        },
        unique: true
    },
    walletId: {
        type: String,
        required: function () {
            return !this.isWalletPayment; // Required only if wallet payment is false
        },
    },
    isWalletPayment: {
        type: Boolean,
        default: false // Default to false for non-wallet payments
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
    },
    orderStatus: {
        type: String,
        default: 'Pending'
    },
    verifiedPayment: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Orders', orderSchema);
