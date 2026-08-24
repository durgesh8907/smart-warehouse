const express = require("express");

const router = express.Router();


const {

productReport,

lowStockReport,

supplierReport


}=require("../controllers/reportController");




// Product Report

router.get(
"/products",
productReport
);




// Low Stock

router.get(
"/low-stock",
lowStockReport
);




// Supplier

router.get(
"/suppliers",
supplierReport
);



module.exports = router;