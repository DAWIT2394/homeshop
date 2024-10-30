const Product = require('../models/Product');
const Shop = require('../models/Shop');

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, stock, images, category, shopId } = req.body;

    try {
        // Check if shop exists
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Create and save new product
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            images,
            category,
            shop: shop._id
        });

        await newProduct.save();

        // Add product reference to the shop
        shop.products.push(newProduct._id);
        await shop.save();

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('shop', 'name location');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

// Get products by shop
exports.getProductsByShop = async (req, res) => {
    const { shopId } = req.params;

    try {
        const products = await Product.find({ shop: shopId });
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for this shop' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

// Update product details
exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, stock, images, category } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.images = images || product.images;
        product.category = category || product.category;

        await product.save();

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};
