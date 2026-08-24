const express = require("express");

const router = express.Router();

const {

    getSuppliers,
    addSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier

} = require("../controllers/supplierController");


// ===========================
// GET ALL SUPPLIERS
// ===========================

router.get("/", getSuppliers);


// ===========================
// GET SINGLE SUPPLIER
// ===========================

router.get("/:id", getSupplier);


// ===========================
// ADD SUPPLIER
// ===========================

router.post("/", addSupplier);


// ===========================
// UPDATE SUPPLIER
// ===========================

router.put("/:id", updateSupplier);


// ===========================
// DELETE SUPPLIER
// ===========================

router.delete("/:id", deleteSupplier);


module.exports = router;