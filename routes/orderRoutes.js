// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser, authorizePermissions1 } = require('../middleware/authentication');

// Create a new order (Resident only)
router.post('/', authenticateUser, authorizePermissions1('resident'), orderController.createOrder);

// Get orders for the authenticated resident
router.get('/', authenticateUser, authorizePermissions1('resident'), orderController.getOrdersByUser);

// Update order status (Shop Owner/Admin only)
router.put('/:orderId', authenticateUser, authorizePermissions1('shop-owner', 'admin'), orderController.updateOrderStatus);

module.exports = router;
