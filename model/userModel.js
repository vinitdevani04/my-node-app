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
    }
});

module.exports = mongoose.model('Users', AddSchem)