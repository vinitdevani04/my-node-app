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
})

module.exports = mongoose.model('Users', AddSchem)