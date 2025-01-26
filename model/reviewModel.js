const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Review', ReviewSchema);
