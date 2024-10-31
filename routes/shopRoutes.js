const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const authMiddleware = require('../middleware/auth');

router.post('/', shopController.createShop);
router.get('/', shopController.getAllShops);

module.exports = router;
