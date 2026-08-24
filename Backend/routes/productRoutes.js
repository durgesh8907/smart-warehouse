const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");


// ==========================================
// ADD PRODUCT
// POST : /api/products
// ==========================================
router.post("/", addProduct);


// ==========================================
// GET ALL PRODUCTS
// GET : /api/products
// ==========================================
router.get("/", getProducts);


// ==========================================
// GET SINGLE PRODUCT
// GET : /api/products/:id
// ==========================================
router.get("/:id", getSingleProduct);


// ==========================================
// UPDATE PRODUCT
// PUT : /api/products/:id
// ==========================================
router.put("/:id", updateProduct);


// ==========================================
// DELETE PRODUCT
// DELETE : /api/products/:id
// ==========================================
router.delete("/:id", deleteProduct);


// ==========================================
// EXPORT ROUTER
// ==========================================
module.exports = router;