const db = require("../config/db");

// ===========================
// GET ALL SUPPLIERS
// ===========================
const getSuppliers = (req, res) => {

    const sql = `
        SELECT *
        FROM suppliers
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(result);

    });

};

// ===========================
// ADD SUPPLIER
// ===========================
const addSupplier = (req, res) => {

    const {
        supplier_name,
        company_name,
        email,
        phone,
        address,
        city,
        state,
        pincode
    } = req.body;

    const sql = `
        INSERT INTO suppliers
        (
            supplier_name,
            company_name,
            email,
            phone,
            address,
            city,
            state,
            pincode
        )
        VALUES (?,?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            supplier_name,
            company_name,
            email,
            phone,
            address,
            city,
            state,
            pincode
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Supplier Added Successfully"
            });

        }
    );

};

// ===========================
// GET SINGLE SUPPLIER
// ===========================
const getSupplier = (req, res) => {

    const sql = "SELECT * FROM suppliers WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(result[0]);

    });

};

// ===========================
// UPDATE SUPPLIER
// ===========================
const updateSupplier = (req, res) => {

    const {
        supplier_name,
        company_name,
        email,
        phone,
        address,
        city,
        state,
        pincode
    } = req.body;

    const sql = `
        UPDATE suppliers
        SET
        supplier_name=?,
        company_name=?,
        email=?,
        phone=?,
        address=?,
        city=?,
        state=?,
        pincode=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            supplier_name,
            company_name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            req.params.id
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Supplier Updated Successfully"
            });

        }
    );

};

// ===========================
// DELETE SUPPLIER
// ===========================
const deleteSupplier = (req, res) => {

    const sql = "DELETE FROM suppliers WHERE id=?";

    db.query(sql, [req.params.id], (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Supplier Deleted Successfully"
        });

    });

};

module.exports = {

    getSuppliers,
    addSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier

};