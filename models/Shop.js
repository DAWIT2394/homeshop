const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shopId: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to User schema
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'  // Reference to Product schema
  }]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
