const Shop = require('../models/Shop');

// Create a new shop
exports.createShop = async (req, res) => {
    const { name, description, location } = req.body;
    const owner = req.user._id;

    try {
        const newShop = new Shop({ owner, name, description, location });
        await newShop.save();
        res.status(201).json(newShop);
    } catch (err) {
        console.error("Error creating shop:", err); // Log error details
        res.status(500).json({ error: err.message });
    }
};

// Get all shops
exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate('owner');
        res.json(shops);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
