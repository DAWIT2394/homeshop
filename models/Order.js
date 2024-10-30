const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalPrice: { type: Number, required: true },
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Delivered'], default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
