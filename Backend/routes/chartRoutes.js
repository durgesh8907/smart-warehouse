const express = require("express");

const router = express.Router();

const {
    inventoryChart,
    salesChart
} = require("../controllers/chartController");

// Inventory Chart
router.get("/inventory", inventoryChart);

// Sales Chart
router.get("/sales", salesChart);

module.exports = router;