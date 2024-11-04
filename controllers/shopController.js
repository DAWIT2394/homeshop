const Shop = require('../models/Shop');  // Assuming the Shop model is in the models folder
const User = require('../models/User');  // Assuming the User model is in the models folder

// Create a new Shop
exports.createShop = async (req, res) => {
  try {
    const { shopId, owner, name, description, location, products } = req.body;

    // Check if owner exists
    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const newShop = new Shop({
      shopId,
      owner,
      name,
      description,
      location,
      products
    });

    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate('owner').populate('products');
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Shop by ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('owner').populate('products');
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Shop by ID
exports.updateShop = async (req, res) => {
  try {
    const { name, description, location, products } = req.body;

    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      { name, description, location, products },
      { new: true }  // Return the updated shop
    ).populate('owner').populate('products');

    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json(updatedShop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Shop by ID
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
