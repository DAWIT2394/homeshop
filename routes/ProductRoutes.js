const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Create a new product (Shop Owner/Admin only)
router.post('/', authMiddleware, productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get products by shop
router.get('/shop/:shopId', productController.getProductsByShop);

// Update product details (Shop Owner/Admin only)
router.put('/:productId', authMiddleware, productController.updateProduct);

// Delete a product (Shop Owner/Admin only)
router.delete('/:productId', authMiddleware, productController.deleteProduct);

module.exports = router;
