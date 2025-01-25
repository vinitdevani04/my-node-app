const mongoose = require("mongoose")
const moment = require("moment");

const Users = mongoose.Schema({
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
    createdAt: {
        type: String,
        default: () => moment().format("DD-MM-YYYY hh:mm A")
    }
});

module.exports = mongoose.model('Users', Users)