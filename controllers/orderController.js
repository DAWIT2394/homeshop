// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const User = require('../models/User');

// Create a new order
exports.createOrder = async (req, res) => {
    const { products, totalPrice, shopId } = req.body;
    const residentId = req.user.userId; // Assuming `req.user.userId` is set by authentication middleware

    try {
        // Verify the shop exists
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Check if all products exist and belong to the specified shop
        const foundProducts = await Product.find({ _id: { $in: products }, shop: shopId });
        if (foundProducts.length !== products.length) {
            return res.status(400).json({ message: 'Some products are invalid or not in this shop' });
        }

        // Create and save the new order
        const order = new Order({
            products,
            totalPrice,
            resident: residentId,
            shop: shopId
        });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get orders for a specific user
exports.getOrdersByUser = async (req, res) => {
    const residentId = req.user.userId;

    try {
        const orders = await Order.find({ resident: residentId }).populate('products').populate('shop');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};
