const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    image: { type: String },
    color: { type: String },
    price: { type: Number },
    storage: { type: String },
    quantity: { type: Number }
});

const orderSchema = new mongoose.Schema({
    phone: { type: String },
    email: { type: String },
    products: [productSchema],
    address: { type: String },
    city: { type: String },
    pincode: { type: String },
    orderDateTime: { type: Date, default: Date.now },
    orderStatus: { type: String, default: 'Pending' },
    verifiedPayment: { type: Boolean, default: true },
    paymentID: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
