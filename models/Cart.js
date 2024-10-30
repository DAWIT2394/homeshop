const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', CartSchema);
