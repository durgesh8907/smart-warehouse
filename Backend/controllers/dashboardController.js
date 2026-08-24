const db = require("../config/db");



// ==========================
// GET DASHBOARD STATS
// ==========================

const getDashboardStats = (req, res) => {



    const sql = `

        SELECT

        COUNT(*) AS totalProducts,


        SUM(stock) AS totalStock,


        SUM(
            CASE
            WHEN stock < 10
            THEN 1
            ELSE 0
            END
        ) AS lowStock,


        COUNT(DISTINCT category) AS totalCategories


        FROM products

    `;



    db.query(sql, (err, result) => {



        if(err){


            return res.status(500).json({

                success:false,

                message:err.message

            });


        }





        res.status(200).json({


            success:true,


            totalProducts:
            result[0].totalProducts || 0,



            totalStock:
            result[0].totalStock || 0,



            lowStock:
            result[0].lowStock || 0,



            totalCategories:
            result[0].totalCategories || 0



        });



    });



};





module.exports = {


    getDashboardStats


};