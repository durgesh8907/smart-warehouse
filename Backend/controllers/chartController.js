const db = require("../config/db");

// ==========================
// Inventory Chart
// ==========================
const inventoryChart = (req, res) => {

    const sql = `
        SELECT
            category,
            SUM(stock) AS stock
        FROM products
        GROUP BY category
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

// ==========================
// Sales Chart
// ==========================
const salesChart = (req, res) => {

    const sql = `
        SELECT
            category,
            SUM(price * stock) AS sales
        FROM products
        GROUP BY category
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

// ==========================
// EXPORT
// ==========================
module.exports = {
    inventoryChart,
    salesChart
};