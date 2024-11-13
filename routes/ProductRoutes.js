const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const {
  authenticateUser,
  authorizePermissions,
  authorizePermissions1
} = require("../middleware/authentication");

// Example roles: 'admin', 'shop-owner'
// Example api_permission: 'create-product', 'update-product', etc.

// Create a new product (Shop Owner/Admin only)
router.post(
  "/",
  authenticateUser,                          // Ensures the user is authenticated
  authorizePermissions1("admin", "shop-owner"), // Restricts to admin and shop owners based on role
  productController.createProduct
);

// Get all products (No restrictions)
router.get("/", productController.getAllProducts);

// Update product details (Admin/Shop Owner only)
router.put(
  "/:productId",
  authenticateUser,
  authorizePermissions1("admin", "shop-owner"),
  productController.updateProduct
);

// Delete a product (Admin only)
router.delete(
  "/:productId",
  authenticateUser,
  authorizePermissions1("admin"), // Only admins can delete products
  productController.deleteProduct
);

module.exports = router;
