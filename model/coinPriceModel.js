const mongoose = require('mongoose');

const coinPriceSchema = new mongoose.Schema({
    network: {
        type: String,
        required: true
    },
    coin: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CoinPrice', coinPriceSchema);