const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    comment: { type: String }
});

module.exports = mongoose.model('Review', ReviewSchema);
