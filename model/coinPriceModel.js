const mongoose = require('mongoose');

const coinPriceSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CoinPrice', coinPriceSchema);