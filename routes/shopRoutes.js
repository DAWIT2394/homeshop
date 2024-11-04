const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Route to create a new shop
router.post('/shops', shopController.createShop);

// Route to get all shops
router.get('/shops', shopController.getAllShops);

// Route to get a shop by ID
router.get('/shops/:id', shopController.getShopById);

// Route to update a shop by ID
router.put('/shops/:id', shopController.updateShop);

// Route to delete a shop by ID
router.delete('/shops/:id', shopController.deleteShop);

module.exports = router;
