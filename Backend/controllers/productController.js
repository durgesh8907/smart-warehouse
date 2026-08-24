const db = require("../config/db");


// ==========================================
// ADD PRODUCT
// POST : /api/products
// ==========================================

const addProduct = (req, res) => {

    const {
        product_name,
        category,
        price,
        stock,
        description
    } = req.body;


    // Validation

    if (!product_name || !category || !price || !stock) {

        return res.status(400).json({

            success: false,
            message: "Please fill all required fields"

        });

    }


    const sql = `

        INSERT INTO products

        (
            product_name,
            category,
            price,
            stock,
            description
        )

        VALUES (?,?,?,?,?)

    `;


    db.query(

        sql,

        [
            product_name,
            category,
            price,
            stock,
            description || ""
        ],

        (err, result) => {


            if (err) {

                return res.status(500).json({

                    success: false,
                    message: err.message

                });

            }


            res.status(201).json({

                success: true,
                message: "Product Added Successfully",
                productId: result.insertId

            });


        }

    );


};




// ==========================================
// GET ALL PRODUCTS
// GET : /api/products
// ==========================================

const getProducts = (req, res) => {


    const sql = `

        SELECT * FROM products

        ORDER BY id DESC

    `;


    db.query(

        sql,

        (err, result) => {


            if (err) {

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }


            res.status(200).json(result);


        }

    );


};




// ==========================================
// GET SINGLE PRODUCT
// GET : /api/products/:id
// ==========================================

const getSingleProduct = (req,res)=>{


    const id = req.params.id;


    const sql = `

        SELECT * FROM products

        WHERE id=?

    `;


    db.query(

        sql,

        [id],

        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }



            if(result.length===0){

                return res.status(404).json({

                    success:false,
                    message:"Product not found"

                });

            }



            res.status(200).json(result[0]);


        }

    );


};




// ==========================================
// UPDATE PRODUCT
// PUT : /api/products/:id
// ==========================================

const updateProduct = (req,res)=>{


    const id = req.params.id;


    const {

        product_name,
        category,
        price,
        stock,
        description

    } = req.body;



    const sql = `

        UPDATE products

        SET

        product_name=?,

        category=?,

        price=?,

        stock=?,

        description=?

        WHERE id=?

    `;



    db.query(

        sql,

        [

            product_name,
            category,
            price,
            stock,
            description,
            id

        ],


        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }



            res.status(200).json({

                success:true,
                message:"Product Updated Successfully"

            });



        }

    );


};





// ==========================================
// DELETE PRODUCT
// DELETE : /api/products/:id
// ==========================================

const deleteProduct = (req,res)=>{


    const id = req.params.id;


    const sql = `

        DELETE FROM products

        WHERE id=?

    `;



    db.query(

        sql,

        [id],


        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }



            res.status(200).json({

                success:true,
                message:"Product Deleted Successfully"

            });



        }

    );


};





// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {

    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct

};