const db = require("../config/db");


// ==========================
// PRODUCT REPORT
// ==========================

const productReport = (req,res)=>{


    const sql = `

    SELECT 
    product_name,
    category,
    price,
    stock

    FROM products

    ORDER BY stock DESC

    `;


    db.query(sql,(err,result)=>{


        if(err){

            return res.status(500).json({

                success:false,
                message:err.message

            });

        }


        res.json(result);


    });


};




// ==========================
// LOW STOCK REPORT
// ==========================


const lowStockReport = (req,res)=>{


    const sql = `

    SELECT *

    FROM products

    WHERE stock <= 20

    ORDER BY stock ASC

    `;


    db.query(sql,(err,result)=>{


        if(err){

            return res.status(500).json({

                success:false,
                message:err.message

            });

        }


        res.json(result);


    });


};





// ==========================
// SUPPLIER REPORT
// ==========================


const supplierReport = (req,res)=>{


    const sql = `

    SELECT *

    FROM suppliers

    ORDER BY created_at DESC

    `;


    db.query(sql,(err,result)=>{


        if(err){

            return res.status(500).json({

                success:false,
                message:err.message

            });

        }


        res.json(result);


    });


};




module.exports = {


    productReport,

    lowStockReport,

    supplierReport


};