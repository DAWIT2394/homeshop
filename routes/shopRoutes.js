const express = require('express');
const { createShop, getAllShops } = require('../controllers/shopController'); // Ensure this path is correct
const router = express.Router();

// Define routes
router.post('/', createShop);
router.get('/', getAllShops);

module.exports = router;
